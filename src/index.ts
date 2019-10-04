const router = require('express-async-router').AsyncRouter();
const defineElectrumClient = require('./electrum-client/define-electrum-client');

router.use(defineElectrumClient);

router.use('/server', require('./server'));
router.use('/transaction', require('./transaction'));
router.use('/address', require('./address'));
router.use('/block', require('./block'));
router.use('/blockchain', require('./blockchain'));
router.use('/scripthash', require('./scripthash'));
router.use('/mempool', require('./mempool'));
router.use('/history', require('./history'));

module.exports = router;
