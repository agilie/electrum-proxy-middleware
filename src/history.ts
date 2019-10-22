import {WalletBtc} from './service/wallet/wallet.btc';
import {WalletCreateOptionsInterface} from './service/wallet/common/wallet-create-options.interface';
import {WalletLtc} from './service/wallet/wallet.ltc';
import {WalletDash} from './service/wallet/wallet.dash';
import {WalletZec} from './service/wallet/wallet.zec';
import {WalletLike} from './service/wallet/common/wallet.interface';
import {CoinType} from './service/wallet/types/coin.type';

import {AsyncRouter} from 'express-async-router';
const asyncRouter = AsyncRouter();

asyncRouter.get('/get_history', async (req: any, res: any) => {
    return await getHistoryHandler(res, req);
});

async function getHistoryHandler(res: any, req: any) {
    const coinType = req.query['coinType'];
    validateCoinType(coinType, res);
    const page = req.query['page'] || 1;
    const pageSize = req.query['pageSize'] || 10;
    const isProd = req.query['isProd'] || false;

    const options: WalletCreateOptionsInterface = {
        userString: '',
        isProd: isProd,
        type: CoinType.BTC,
        bitcore: null,
    };

    const wallet = getWallet(coinType, options);
    const {result, executionTime} = await getHistory(wallet, page, pageSize, req);

    return res.json({
        status: 'success',
        result: result,
        time: executionTime.time,
    });
}

async function getHistory(wallet: WalletLike, page: number, pageSize: number, req: any) {
    const perf = require('execution-time')();
    perf.start();
    const result = await wallet.getHistory(page, pageSize, req);
    const timeResult = perf.stop();
    return {result, executionTime: timeResult};
}

function getWallet(coinType: string, options: WalletCreateOptionsInterface): WalletLike {
    let wallet: WalletLike;
    switch (coinType) {
        case CoinType.BTC: {
            wallet = new WalletBtc(options);
            break;
        }
        case CoinType.LTC: {
            wallet = new WalletLtc(options);
            break;
        }
        case CoinType.DASH: {
            wallet = new WalletDash(options);
            break;
        }
        case CoinType.ZEC: {
            wallet = new WalletZec(options);
            break;
        }
    }
    return wallet;
}

function validateCoinType(coinType: CoinType, res: any) {
    if(!coinType) {
        return res.json({
            status: 'error',
            result: 'Coin type is missing'
        });
    }
}

export const router = asyncRouter;
