import {CoinType} from '../service/wallet/types/coin.type';
import {Netmode} from './types/netmode';
import {ElectrumConfig} from '../service/wallet/types/electrum.config';
import {getElectrumConfigs} from '../service/mq-service';
const isPortReachable = require('is-port-reachable');


export async function getAvailableServer(type: CoinType, netMode: Netmode): Promise<ElectrumConfig> {
    const configs : ElectrumConfig [] = getElectrumConfigs(netMode, type);
    let availableConfig: ElectrumConfig = null;

    for (let config of configs) {
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

