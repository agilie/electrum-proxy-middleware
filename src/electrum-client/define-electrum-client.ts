import {ElectrumConfig} from '../service/wallet/types/electrum.config';
import {validateOrReject} from 'class-validator';
import {ConfigurationReqDTO} from './types/configuration-req-dto';
import {Response} from 'express';
import {CoinTypeReqDTO} from './types/coin-type-req-dto';
import {plainToClass} from 'class-transformer';
import {ElectrumClient} from './index';
import {getElectrumConfig} from './electrum-config';

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
    if ((query as CoinTypeReqDTO).coinType && !configurationPresent(query)) {
        const coinTypeDTO: CoinTypeReqDTO = plainToClass(CoinTypeReqDTO, query);
        await validateOrReject(coinTypeDTO);
        return getElectrumConfig(coinTypeDTO.coinType, coinTypeDTO.netMode);
    } else {
        const configurationDTO: ConfigurationReqDTO = plainToClass(ConfigurationReqDTO, query);
        await validateOrReject(configurationDTO);
        return configurationDTO;
    }
}

function configurationPresent(query: any) {
    return query.host || query.port || query.connectionType || query.version;
}

module.exports.defineElectrumClient = defineElectrumClient;
module.exports.getOptions = getOptions;
