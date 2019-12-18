import {CoinMap, CoinType} from '../service/wallet/types/coin.type';
import {Netmode} from './types/netmode';
import {ElectrumConfig} from '../service/wallet/types/electrum.config';
import {getDataFromQueue} from '../service/mq-service';
import {electrumServersDefault, electrumServersDefaultTestnet} from '../service/electrum-servers.default';
const isPortReachable = require('is-port-reachable');

let additionalElectrumServers: CoinMap<ElectrumConfig[]>;

export async function getElectrumConfig(type: CoinType, netMode: Netmode): Promise<ElectrumConfig> {
    additionalElectrumServers = await getDataFromQueue('Peers');

    let additionalConfigs = (additionalElectrumServers) ? additionalElectrumServers[type] : [];
    let configs = netMode == Netmode.TESTNET ? electrumServersDefaultTestnet[type] : electrumServersDefault[type];
    let availableConfig: ElectrumConfig = null;

    for (let config of configs.concat(additionalConfigs)) {
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

