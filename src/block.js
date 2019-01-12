const router = require('express-async-router').AsyncRouter();

// blockchain.block.header
router.get('/header', async (req, res) => {
    const height = req.query['height'];
    const json = await req.locals.ecl.blockchainBlock_getHeader(height);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// get current
router.get('/current', async (req, res) => {
    const raw = req.query['raw'] === 'true';
    const json = await req.locals.ecl.blockchainHeaders_subscribe(raw);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

module.exports = router;
