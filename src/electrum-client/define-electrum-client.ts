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
        res.json({error: e.message}).status(409);
    }
}

async function getOptions(query: ConfigurationReqDTO | CoinTypeReqDTO): Promise<ElectrumConfig> {
    if ((query as CoinTypeReqDTO).coinType) {
        const coinTypeDTO : CoinTypeReqDTO = plainToClass(CoinTypeReqDTO, query);
        await validateRequiredFields(coinTypeDTO);
        return _getElectrumConfig(coinTypeDTO.coinType);
    } else {
        const configurationDTO : ConfigurationReqDTO = plainToClass(ConfigurationReqDTO, query);
        await validateRequiredFields(configurationDTO);
        return configurationDTO;
    }
}

async function validateRequiredFields(object: ConfigurationReqDTO | CoinTypeReqDTO) {
    await validateOrReject(object).catch(errors => {
        let err = [];
        for(let validationError of errors){
            for(let error of Object.values(validationError['constraints'])){
                err.push(error);
            }
        }
        throw new Error("Promise rejected (validation failed). Errors: " + err.join(', '));
    });
}

function _getElectrumConfig(type: CoinType): ElectrumConfig {
    const configs = electrumServersDefault[type];
    return configs[Math.floor(Math.random() * configs.length)];
}

module.exports = defineElectrumClient;
