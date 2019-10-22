import {electrumServersDefault} from '../service/electrum-servers.default';
import {ElectrumConfig} from '../service/wallet/types/electrum.config';
import {CoinType} from '../service/wallet/types/coin.type';
import {validateOrReject} from 'class-validator';
import {ConfigurationReqDTO} from './types/configuration-req-dto';
import {Response} from 'express';
import {CoinTypeReqDTO} from './types/coin-type-req-dto';
import {plainToClass} from 'class-transformer';

const ElectrumClient = require('./index');

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
        return _getElectrumConfig(coinTypeDTO.coinType);
    } else {
        const configurationDTO: ConfigurationReqDTO = plainToClass(ConfigurationReqDTO, query);
        await validateOrReject(configurationDTO);
        return configurationDTO;
    }
}

function _getElectrumConfig(type: CoinType): ElectrumConfig {
    const configs = electrumServersDefault[type];
    return configs[Math.floor(Math.random() * configs.length)];
}

if (process.env.NODE_ENV === 'test') {
    module.exports = getOptions;
} else {
    module.exports = defineElectrumClient;
}

