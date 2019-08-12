// blockchain.scripthash.get_balance
// blockchain.scripthash.get_history
// blockchain.scripthash.get_mempool
// blockchain.scripthash.listunspent
// blockchain.scripthash.subscribe

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

// 'blockchain.scripthash.get_history'
// TODO: Add pagination here
router.get('/history', async (req, res) => {
    const scripthash = req.query['scripthash'];
    const json = await req.locals.ecl.blockchainScripthash_getHistory(scripthash);
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

// 'blockchain.scripthash.subscribe'
router.get('/subscribe', async (req, res) => {
    const scripthash = req.query['scripthash'];
    const json = await req.locals.ecl.blockchainScripthash_subscribe(scripthash);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// 'blockchain.scripthash.unsubscribe'
router.get('/unsubscribe', async (req, res) => {
    const scripthash = req.query['scripthash'];
    const json = await req.locals.ecl.blockchainScripthash_unsubscribe(scripthash);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});


module.exports = router;
