const router = require('express-async-router').AsyncRouter();
const electrumClient = require('./electrum-client');

router.use(defineElectrumClient);

router.use('/server', require('./server'));
router.use('/transaction', require('./transaction'));
router.use('/address', require('./address'));
router.use('/block', require('./block'));
router.use('/blockchain', require('./blockchain'));
router.use('/scripthash', require('./scripthash'));
router.use('/mempool', require('./mempool'));


async function defineElectrumClient(req, res) {
    try {
        validateRequiredParams(req);
        const ecl = new electrumClient(req.query.port, req.query.host, req.query.connection);
        req.locals = req.locals || {};
        req.locals.ecl = ecl;
        return await ecl.connect();
    } catch (e) {
        res.json({error: e.message}).status(409);
    }
}

function validateRequiredParams(req) {
    if (!req.query.port) {
        throw Error('port is missing')
    }
    if (!req.query.host) {
        throw Error('host is missing')
    }
}

module.exports = router;
