import {WalletBtc} from "./service/wallet/wallet.btc";
import {config} from "./app/app.config";
import {WalletCreateOptionsInterface} from "./service/wallet/common/wallet-create-options.interface";

const router = require('express-async-router').AsyncRouter();

const bitcore = require('bitcore-lib');

router.get('/get_history', async (req, res) => {
    const coin_type = req.query['coin_type'];

    const options: WalletCreateOptionsInterface = {
        userString: '',
        isProd: config.wallet.isProd,
        type: null,
        bitcore: null
    };

    var btc_wallet = new WalletBtc(options);

    var result = btc_wallet.getHistory(1, 1, req);

    res.json({
        status: 'success',
        result: result
    });

});


module.exports = router;
//
// // 'blockchain.scripthash.get_history'
// router.get('/get_history', async (req, res) => {
//     const pageSize = 10;
//     const protocolVersion = req.query['protocol'];
//     const pagination = req.query['pagination'];
//     const scripthash = req.query['scripthash'];
//     const coin_type = req.query['coin_type'];
//     const page = req.query['page'];
//
//     console.log(_getElectrumConfig(coin_type));
//
//     const transactions = await req.locals.ecl.blockchainScripthash_getHistory(scripthash);
//     await req.locals.ecl.close();
//
//     const result: TransactionLike[] = [];
//     for (let i = 0; i < transactions.length; i++) {
//         const tx = transactions[i];
//
//         const txObj = bitcore.Transaction(tx.raw).toObject();
//         const txData = await _getTxData(txObj, tx);
//
//         let timestamp;
//
//         if (tx.height && tx.height > 0) {
//             const blockHeader = req.locals.ecl.blockchainBlock_getHeader(tx.height, protocolVersion); //!!!!! async
//             req.locals.ecl.close();
//             timestamp = blockHeader.timestamp;
//         } else {
//             timestamp = 1;
//         }
//
//         const appTx = {
//             hash: tx.txid,
//             value: +txData.value / 1e8 + '',
//             timestamp: timestamp * 1000,
//             fee: +txData.fee / 1e8 + '',
//             status: tx.height > 0 ? 'completed' : 'incompleted',
//         };
//
//         result.push(appTx);
//     }
//
//     if (pagination && page && Number(page) && page > 0) {
//         result = result.slice(Number(page - 1) * pageSize, (page * pageSize));
//     } else {
//         if (pagination) {
//             req.locals.ecl.close();
//             result = {msg: 'error', result: 'wrong page number',};
//         }
//     }
//
//     res.json({
//         status: 'success',
//         result: result
//     });
// });
//
// function _getTxData(txObjext: ParsedTx, tx: any): Promise<{ value: string, fee: string }> {
//     if (txObjext.inputs.length > 20 || (txObjext.inputs.length <= 0 && txObjext.outputs.length <= 0) ) {
//         // too match inputs to calculate
//         return {
//             value: '...',
//             fee: '...',
//         };
//     }
//
//     const inputs = _parseCoreInputs(txObjext, tx);
//     const totalOut = txObjext.outputs.reduce((acc, out) => acc + Number(out.satoshis), 0);
//
//     var scriptHEX = 1; //!!!!!!!!!!
//
//     const myIn = txObjext.outputs //
//         .filter(out => out.script === scriptHEX)
//         .reduce((acc, out) => acc + Number(out.satoshis), 0);
//
//     const totalIn = inputs.reduce((acc, out) => acc + Number(out.satoshis), 0);
//     const myOut = inputs //
//         .filter(out => out.script === scriptHEX)
//         .reduce((acc, out) => acc + Number(out.satoshis), 0);
//
//     const fee = totalIn - totalOut;
//
//     return {
//         fee: fee + '',
//         value: myIn - myOut + fee + '',
//     };
// }
//
// function  _parseCoreInputs(txObjext: ParsedTx, tx: any): Promise<Array<{ satoshis: number; script: string }>> {
//     const result = txObjext.inputs //
//         .map(input => {
//             return tx.pipe(
//                 map(rawTx => {
//                     const txObj = bitcore.Transaction(rawTx).toObject();
//                     return txObj.outputs[input.outputIndex];
//                 }),
//             );
//         });
//
//
//     return zip(...result).toPromise() as Promise<Array<{ satoshis: number; script: string }>>;
// }
//
// function _getElectrumConfig(type: string): ElectrumConfig {
//     return ElectrumConfigService.getConfig(type);
// }
//
// interface ParsedTx {
//     hash: string;
//     version: number;
//     inputs: Array<{
//         prevTxId: string;
//         outputIndex: number;
//         sequenceNumber: number;
//         script: string;
//         scriptString: string;
//     }>;
//     outputs: Array<{
//         satoshis: number;
//         script: string;
//     }>;
//     nLockTime: number;
// }
//
//

