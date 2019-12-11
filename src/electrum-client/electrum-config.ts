import {CoinType} from '../service/wallet/types/coin.type';
import {Netmode} from './types/netmode';
import {ProtocolTypeEnum} from './types/protocol.type.enum';
import {ElectrumConfig} from '../service/wallet/types/electrum.config';
import {getDataFromQueue} from '../service/mq-service';
import {electrumServersDefault, electrumServersDefaultTestnet} from '../service/electrum-servers.default';
import {RequestedServer} from '../service/wallet/types/requested-server';
const isPortReachable = require('is-port-reachable');

let servers_json : string  = '';

export async function _getElectrumConfig(type: CoinType, netMode: Netmode, connectionType: ProtocolTypeEnum): Promise<ElectrumConfig> {
    servers_json = await getDataFromQueue('Peers');

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

async function getElectrumServers(type: CoinType, connectionType: ProtocolTypeEnum): Promise<ElectrumConfig[]> {
    if (process.env.NODE_ENV === 'test') { return; }
    if(!servers_json){ return []; }

    let full_config_servers: RequestedServer[] = JSON.parse(servers_json).filter((server: any) => Object.keys(CoinType).includes(server.currency) &&
        server.peers &&
        server.currency == type.toUpperCase());

    let servers: ElectrumConfig[] = [];
    if (full_config_servers.length > 0) {
        servers = full_config_servers[0].peers.map(function(server: any) {
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
