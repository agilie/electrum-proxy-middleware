import {CoinType} from '../service/wallet/types/coin.type';
import {Netmode} from './types/netmode';
import {ProtocolTypeEnum} from './types/protocol.type.enum';
import {ElectrumConfig} from '../service/wallet/types/electrum.config';
import {checkQueue} from '../service/mq-service';
import {electrumServersDefault, electrumServersDefaultTestnet} from '../service/electrum-servers.default';

const isPortReachable = require('is-port-reachable');
const fs = require('fs');

export async function _getElectrumConfig(type: CoinType, netMode: Netmode, connectionType: ProtocolTypeEnum): Promise<ElectrumConfig> {
    await checkQueue('Peers');

    let additionalServers = await getElectrumServers(type, connectionType);
    let configs = netMode == Netmode.TESTNET ? electrumServersDefaultTestnet[type] : electrumServersDefault[type];

    let availableConfig: ElectrumConfig = null;
    for (let config of configs.concat(additionalServers)) {
        const hostIsAvailable = await isPortReachable(config.port, {host: config.host});
        if (hostIsAvailable) {
            availableConfig = config;
            break;
        }
    }

    if (!availableConfig) {
        throw Error('No available configs');
    }

    return availableConfig;
}

async function getElectrumServers(type: CoinType, connectionType: ProtocolTypeEnum): Promise<ElectrumConfig> {
    if (process.env.NODE_ENV === 'test') { return; }

    const electrum_servers_data = fs.readFileSync('electrum_servers.json', 'utf8');

    let servers = JSON.parse(electrum_servers_data).filter((server: any) => Object.keys(CoinType).includes(server.currency) &&
        server.peers &&
        server.currency == type.toUpperCase());

    if (servers.length > 0) {
        servers = servers[0].peers.map(function(server: any) {
            return {
                host: server.host,
                port: connectionType == ProtocolTypeEnum.TCP ? server.tcpPort : server.sslPort,
                connectionType: connectionType == ProtocolTypeEnum.TCP ? ProtocolTypeEnum.TCP : ProtocolTypeEnum.SSL,
                version: server.version,
            };

        });
        return servers;
    } else {
        return [];
    }

}
