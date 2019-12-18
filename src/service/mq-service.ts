import {RequestedServer} from './wallet/types/requested-server';
import {CoinMap, CoinType} from './wallet/types/coin.type';
import {ElectrumConfig} from './wallet/types/electrum.config';
import {RequestedElectrumConfig} from './wallet/types/requested-electrum.config';
import {ProtocolTypeEnum} from '../electrum-client/types/protocol.type.enum';

const amqp = require('amqplib/callback_api');

const connectionConfig = {
    protocol: 'amqp',
    hostname: '',
    port: 5672,
    username: 'dev',
    password: '',
    locale: 'en_US',
    frameMax: 0,
    heartbeat: 0,
    vhost: '/',
};

let ch: any = null;

let electrumConfigs: CoinMap<ElectrumConfig[]> = {
    [CoinType.BTC]: [],
    [CoinType.LTC]: [],
    [CoinType.ZEC]: [],
    [CoinType.DASH]: []
};

amqp.connect(connectionConfig, function(err: any, conn: any) {
    conn.createChannel(function(err: any, channel: any) {
        ch = channel;
    });
});

export async function getDataFromQueue(queueName: string) {
    if (ch === null || process.env.NODE_ENV === 'test') { return; }
    ch.assertQueue(queueName, {durable: false});

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queueName);

    ch.consume('Peers', processMsg, {noAck: false});

    return electrumConfigs;
}

function processMsg(msg: string) {
    work(msg, function(ok: any) {
        try {
            if (ok) {
                ch.ack(msg);
            } else {
                ch.reject(msg, true);
            }
        } catch (e) {
            closeOnErr(e);
        }
    });
}

async function work(msg: any, cb: any) {
    _modifyToElectrumServers(msg.content.toString());
    console.log('Electrum servers ', msg.content.toString());
    cb(true);
}

function _modifyToElectrumServers(serversJson: string): void {
    if (!serversJson) {
        return;
    }

    let supportedServers: RequestedServer[] = JSON.parse(serversJson)
        .filter((server: any) => Object.keys(CoinType).includes(server.currency) && server.peers);

    _collectSupportedServers(supportedServers);
}

function _collectSupportedServers(fullConfigServers: RequestedServer[]): void {
    let collectedElectrumServers: ElectrumConfig[] = [];

    fullConfigServers.forEach(function(fullConfigServer: RequestedServer) {
        fullConfigServer.peers.forEach(function(server: RequestedElectrumConfig): void {
            collectedElectrumServers.push({
                host: server.host,
                port: server.tcpPort,
                connectionType: ProtocolTypeEnum.TCP,
                version: server.version
            });
            collectedElectrumServers.push({
                host: server.host,
                port: server.sslPort,
                connectionType: ProtocolTypeEnum.SSL,
                version: server.version
            });
        });

        electrumConfigs[fullConfigServer.currency.toLowerCase()] = collectedElectrumServers;
    });
}

function closeOnErr(err: any) {
    if (!err) { return false; }
    console.error('[AMQP] error', err);
    ch.close();
    return true;
}

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});
