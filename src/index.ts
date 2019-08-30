import {ElectrumConfig} from './service/wallet/types/electrum.config';
import {electrumServersDefault} from './service/electrum-servers.default';

const router = require('express-async-router').AsyncRouter();
const ElectrumClient = require('./electrum-client');

router.use(defineElectrumClient);

router.use('/server', require('./server'));
router.use('/transaction', require('./transaction'));
router.use('/address', require('./address'));
router.use('/block', require('./block'));
router.use('/blockchain', require('./blockchain'));
router.use('/scripthash', require('./scripthash'));
router.use('/mempool', require('./mempool'));
router.use('/history', require('./history'));

async function defineElectrumClient(req: any, res: any) {
    try {
        const defaultOptions = req.query.coinType ? _getElectrumConfig(req.query.coinType) : null;
        const port = req.query.port || (defaultOptions || {}).port;
        const host = req.query.host || (defaultOptions || {}).ip;
        const protocol = req.query.connection || (defaultOptions || {}).connectionType || 'tcp';

        validateRequiredParams(port, host);
        const ecl = new ElectrumClient(port, host, protocol);
        req.locals = req.locals || {};
        req.locals.ecl = ecl;
        return await ecl.connect();
    } catch (e) {
        res.json({error: e.message}).status(409);
    }
}

function _getElectrumConfig(type: string): ElectrumConfig {
    const configs = electrumServersDefault[type];
    return configs[Math.floor(Math.random() * configs.length)];
}

function validateRequiredParams(port: number, host: string) {
    if (!port) {
        throw Error('port is missing');
    }
    if (!host) {
        throw Error('host is missing');
    }
}

module.exports = router;
