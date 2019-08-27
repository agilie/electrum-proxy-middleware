const router = require('express-async-router').AsyncRouter();

const bitcore = require('bitcore-lib');

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


// 'blockchain.scripthash.get_history'
router.get('/get_history', async (req, res) => {
    const pageSize = 10;
    const protocolVersion = req.query['protocol'];
    const pagination = req.query['pagination'];
    const scripthash = req.query['scripthash'];
    const page = req.query['page'];

    const transactions = await req.locals.ecl.blockchainScripthash_getHistory(scripthash);
    await req.locals.ecl.close();

    var result = [];
    for (let i = 0; i < transactions.length; i++) {
        const tx = transactions[i];

        const txObj = bitcore.Transaction(tx.raw).toObject();
        const txData = await _getTxData(txObj, tx);

        let timestamp;

        if (tx.height && tx.height > 0) {
            const blockHeader = req.locals.ecl.blockchainBlock_getHeader(tx.height, protocolVersion); //!!!!! async
            req.locals.ecl.close();
            timestamp = blockHeader.timestamp;
        } else {
            timestamp = 1;
        }

        const appTx = {
            hash: tx.txid,
            value: +txData.value / 1e8 + '',
            timestamp: timestamp * 1000,
            fee: +txData.fee / 1e8 + '',
            status: tx.height > 0 ? 'completed' : 'incompleted',
        };

        result.push(appTx);
    }

    if (pagination && page && Number(page) && page > 0) {
        result = result.slice(Number(page - 1) * pageSize, (page * pageSize));
    } else {
        if (pagination) {
            req.locals.ecl.close();
            result = {msg: 'error', result: 'wrong page number',};
        }
    }

    res.json({
        status: 'success',
        result: result
    });
});

function _getTxData(txObjext, tx) {
    if (txObjext.inputs.length > 20) {
        // too match inputs to calculate
        return {
            value: '...',
            fee: '...',
        };
    }

    const inputs = _parseCoreInputs(txObjext, tx);

    const totalOut = txObjext.outputs.reduce((acc, out) => acc + Number(out.satoshis), 0);

    var scriptHEX = 1; //!!!!!!!!!!

    const myIn = txObjext.outputs //
        .filter(out => out.script === scriptHEX)
        .reduce((acc, out) => acc + Number(out.satoshis), 0);

    const totalIn = inputs.reduce((acc, out) => acc + Number(out.satoshis), 0);
    const myOut = inputs //
        .filter(out => out.script === scriptHEX)
        .reduce((acc, out) => acc + Number(out.satoshis), 0);

    const fee = totalIn - totalOut;

    return {
        fee: fee + '',
        value: myIn - myOut + fee + '',
    };
}

function _parseCoreInputs(txObjext, tx) {
    const result = txObjext.inputs //
        .map(input => {
            return tx.pipe(
                map(rawTx => {
                    const txObj = bitcore.Transaction(rawTx).toObject();
                    return txObj.outputs[input.outputIndex];
                }),
            );
        });

    return result;
}


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
