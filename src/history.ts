import {WalletBtc} from './service/wallet/wallet.btc';
import {WalletCreateOptionsInterface} from './service/wallet/common/wallet-create-options.interface';
import {WalletLtc} from './service/wallet/wallet.ltc';
import {WalletDash} from './service/wallet/wallet.dash';
import {WalletZec} from './service/wallet/wallet.zec';
import {WalletLike} from './service/wallet/common/wallet.interface';
import {CoinType} from './service/wallet/types/coin.type';

const router = require('express-async-router').AsyncRouter();

router.get('/get_history', async (req: any, res: any) => {
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

    const perf = require('execution-time')();
    perf.start();
    const result = await wallet.getHistory(page, pageSize, req);
    const timeResult = perf.stop();

    return res.json({
        status: 'success',
        result: result,
        time: timeResult.time,
    });
});

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

function validateCoinType(coinType: CoinType, res: any): WalletLike {
    if(!coinType) {
        return res.json({
            status: 'error',
            result: 'Coin type is missing'
        });
    }
}

module.exports = router;
