const router = require('express-async-router').AsyncRouter();

// 'blockchain.scripthash.get_balance'
router.get('/balance', async (req, res) => {
    const scripthash = req.query['scripthash'];
    const json = await req.locals.ecl.blockchainScripthash_getBalance(scripthash);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// 'blockchain.scripthash.listunspent'
router.get('/listunspent', async (req, res) => {
    const scripthash = req.query['scripthash'];
    const json = await req.locals.ecl.blockchainScripthash_listunspent(scripthash);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// 'blockchain.scripthash.get_mempool'
router.get('/get_mempool', async (req, res) => {
    const scripthash = req.query['scripthash'];
    const json = await req.locals.ecl.blockchainScripthash_getMempool(scripthash);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

module.exports = router;
