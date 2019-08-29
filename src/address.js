// 'blockchain.block.get_chunk'
// 'express-async-router'

const router = require('express-async-router').AsyncRouter();

// 'blockchain.address.get_balance'
router.get('/balance', async (req, res) => {
    const address = req.query['address'];
    const json = await req.locals.ecl.blockchainAddress_getBalance(address);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// 'blockchain.address.get_history'
// TODO: Add pagination here
router.get('/history', async (req, res) => {
    const address = req.query['address'];
    const json = await req.locals.ecl.blockchainAddress_getHistory(address);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// 'blockchain.address.listunspent'
router.get('/listunspent', async (req, res) => {
    const address = req.query['address'];
    const json = await req.locals.ecl.blockchainAddress_listunspent(address);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

module.exports = router;
