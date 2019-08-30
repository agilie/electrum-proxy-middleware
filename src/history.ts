import {WalletBtc} from './service/wallet/wallet.btc';
import {config} from './app/app.config';
import {WalletCreateOptionsInterface} from './service/wallet/common/wallet-create-options.interface';
import {WalletLtc} from './service/wallet/wallet.ltc';
import {WalletDash} from './service/wallet/wallet.dash';
import {WalletZec} from './service/wallet/wallet.zec';
import WalletEth from './service/wallet/wallet.eth';
import {WalletLike} from './service/wallet/common/wallet.interface';

const router = require('express-async-router').AsyncRouter();

router.get('/get_history', async (req: any, res: any) => {
    const coinType = req.query['coinType'];
    const page = req.query['page'] || 1;
    const pageSize = req.query['pageSize'] || 10;

    const wallet = getWallet(coinType);

    if (wallet) {
        const perf = require('execution-time')();
        perf.start();
        const result = await wallet.getHistory(page, pageSize, req);
        const timeResult = perf.stop();

        return res.json({
            status: 'success',
            result: result,
            time: timeResult.time,
        });
    } else {
        return res.json({
            status: 'error',
            result: [],
        });
    }
});

function getWallet(coinType: string): WalletLike {
    const options: WalletCreateOptionsInterface = {
        userString: '',
        isProd: config.wallet.isProd,
        type: null,
        bitcore: null,
    };

    let wallet: WalletLike = null;
    switch (coinType) {
        case 'btc': {
            wallet = new WalletBtc(options);
            break;
        }
        case 'ltc': {
            wallet = new WalletLtc(options);
            break;
        }
        case 'dash': {
            wallet = new WalletDash(options);
            break;
        }
        case 'zec': {
            wallet = new WalletZec(options);
            break;
        }
        case 'eth': {
            wallet = new WalletEth(options);
            break;
        }
        default: {
            break;
        }
    }
    return wallet;
}

module.exports = router;
