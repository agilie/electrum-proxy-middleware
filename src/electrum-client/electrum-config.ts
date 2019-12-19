import {CoinMap, CoinType} from '../service/wallet/types/coin.type';
import {Netmode} from './types/netmode';
import {ElectrumConfig} from '../service/wallet/types/electrum.config';
import {initMQService, getElectrumConfigs} from '../service/mq-service';
const isPortReachable = require('is-port-reachable');


export async function getElectrumConfig(type: CoinType, netMode: Netmode): Promise<ElectrumConfig> {
    await initMQService('Peers');

    let configs : CoinMap<ElectrumConfig[]> = getElectrumConfigs();
    let availableConfig: ElectrumConfig = null;

    for (let config of configs[type]) {
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

