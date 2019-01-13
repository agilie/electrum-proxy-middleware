const router = require('express-async-router').AsyncRouter();
const electrumClient = require('./electrum-client');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use(defineElectrumClient);

router.use('/server', require('./server'));
router.use('/transaction', require('./transaction'));
router.use('/address', require('./address'));
router.use('/block', require('./block'));
router.use('/blockchain', require('./blockchain'));

async function defineElectrumClient(req, res) {
    try {
        validateRequiredParams(req);
        const ecl = new electrumClient(req.query.port, req.query.host, req.params.connection = 'tcp');
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
