const router = require('express-async-router').AsyncRouter();

// mempool.get_fee_histogram
router.get('/get_fee_histogram', async (req, res) => {
    const json = await req.locals.ecl.mempool_getFeeHistogram();
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

module.exports = router;
