const router = require('express-async-router').AsyncRouter();

// blockchain.block.header
router.get('/estimatefee', async (req, res) => {
    const blocks = req.query['blocks'];
    const json = await req.locals.ecl.blockchainEstimatefee(blocks);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

module.exports = router;
