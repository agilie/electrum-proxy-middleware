import {electrumServersDefault} from '../service/electrum-servers.default';
import {ElectrumConfig} from '../service/wallet/types/electrum.config';
import {ElectrumConfigValidator} from '../errors/electrum-config-validator';
import {CoinType} from '../service/wallet/types/coin.type';


const ElectrumClient = require('./index');

async function defineElectrumClient(req: any, res: any) {
    try {
        validateRequiredParams(req.query);

        const coinType = req.query.coinType;
        const defaultOptions = coinType ? _getElectrumConfig(req.query.coinType) : null;

        const port = req.query.port || (defaultOptions || {}).port;
        const host = req.query.host || (defaultOptions || {}).ip;
        const protocol = req.query.protocol || (defaultOptions || {}).connectionType || 'tcp';
        const version = req.query.version || (defaultOptions || {}).version;

        const ecl = new ElectrumClient(port, host, protocol, version);
        req.locals = req.locals || {};
        req.locals.ecl = ecl;
        return await ecl.connect();
    } catch (e) {
        res.json({error: e.message}).status(409);
    }
}

function validateRequiredParams(query: any) {
    let validator = new ElectrumConfigValidator(query);
    validator.validateInitRequiredParams();
    if(validator.errors.length > 0){
        throw Error(validator.errors.toString());
    }
}

function _getElectrumConfig(type: CoinType): ElectrumConfig {
    const configs = electrumServersDefault[type];
    return configs[Math.floor(Math.random() * configs.length)];
}


module.exports = defineElectrumClient;
