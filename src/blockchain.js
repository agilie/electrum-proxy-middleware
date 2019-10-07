const router = require('express-async-router').AsyncRouter();

// blockchain.estimatefee
router.get('/estimatefee', async (req, res) => {
    const blocks = req.query['blocks'];
    const json = await req.locals.ecl.blockchainEstimatefee(blocks);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// blockchain.relayfee
router.get('/relayfee', async (req, res) => {
    const json = await req.locals.ecl.blockchain_relayfee();
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

module.exports = router;
