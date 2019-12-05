import {electrumServersDefault, electrumServersDefaultTestnet} from '../service/electrum-servers.default';
import {ElectrumConfig} from '../service/wallet/types/electrum.config';
import {CoinType} from '../service/wallet/types/coin.type';
import {validateOrReject} from 'class-validator';
import {ConfigurationReqDTO} from './types/configuration-req-dto';
import {Response} from 'express';
import {CoinTypeReqDTO} from './types/coin-type-req-dto';
import {plainToClass} from 'class-transformer';
import {ElectrumClient} from './index'
import {Netmode} from './types/netmode';
const isPortReachable = require('is-port-reachable');

async function defineElectrumClient(req: any, res: Response) {
    try {
        const defaultOptions: ElectrumConfig = await getOptions(req.query);
        const port = defaultOptions.port;
        const host = defaultOptions.host;
        const protocol = defaultOptions.connectionType;
        const version = defaultOptions.version;

        const ecl = new ElectrumClient(port, host, protocol, version);
        req.locals = req.locals || {};
        req.locals.ecl = ecl;
        return await ecl.connect();
    } catch (e) {
        res.json({error: e.message || e}).status(409);
    }
}

async function getOptions(query: ConfigurationReqDTO | CoinTypeReqDTO): Promise<ElectrumConfig> {
    if ((query as CoinTypeReqDTO).coinType) {
        const coinTypeDTO: CoinTypeReqDTO = plainToClass(CoinTypeReqDTO, query);
        await validateOrReject(coinTypeDTO);
        return _getElectrumConfig(coinTypeDTO.coinType, coinTypeDTO.netMode);
    } else {
        const configurationDTO: ConfigurationReqDTO = plainToClass(ConfigurationReqDTO, query);
        await validateOrReject(configurationDTO);
        return configurationDTO;
    }
}

async function _getElectrumConfig(type: CoinType, netMode: Netmode) : ElectrumConfig {
    const configs = netMode == Netmode.TESTNET ? electrumServersDefaultTestnet[type] : electrumServersDefault[type];

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

module.exports.defineElectrumClient = defineElectrumClient;
module.exports.getOptions = getOptions;
module.exports._getElectrumConfig = _getElectrumConfig;
