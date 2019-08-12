const router = require('express-async-router').AsyncRouter();

// blockchain.block.header
router.get('/header', async (req, res) => {
    const height = req.query['height'];
    const protocolVersion = req.query['protocol'];
    const json = await req.locals.ecl.blockchainBlock_getHeader(height, protocolVersion);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// blockchain.block.headers
router.get('/headers', async (req, res) => {
    const start_height = req.query['start_height'];
    const count = req.query['count'];
    const json = await req.locals.ecl.blockchainBlock_headers(start_height, count);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// get current
router.get('/current', async (req, res) => {
    const json = await req.locals.ecl.blockchainHeaders_subscribe();
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

module.exports = router;
