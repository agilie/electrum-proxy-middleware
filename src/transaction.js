const router = require('express-async-router').AsyncRouter();

// blockchain.transaction.broadcast
router.post('/broadcast', async function (req, res) {
    const rawTx = req.body['raw_tx'];
    const json = await req.locals.ecl.blockchainTransaction_broadcast(rawTx);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// blockchain.transaction.get
router.get('/get', async function (req, res) {
    const txHash = req.query['tx_hash'];
    const verbose = req.query['verbose'] === 'true';

    const json = await req.locals.ecl.blockchainTransaction_get(txHash, verbose, null);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// blockchain.transaction.get_merkle
router.get('/get-merkle', async function (req, res) {
    const txHash = req.query['tx_hash'];
    const height = req.query['height'];

    const json = await req.locals.ecl.blockchainTransaction_getMerkle(txHash, height);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

// blockchain.transaction.id_from_pos
router.get('/id-from-pos', async function (req, res) {
    const height = req.query['height'];
    const txPos = req.query['tx_pos'];
    const merkle = req.query['merkle'] || false;

    const json = await req.locals.ecl.blockchainTransaction_idFromPos(height, txPos, merkle);
    await req.locals.ecl.close();

    res.json({
        status: 'success',
        result: json
    });
});

module.exports = router;
