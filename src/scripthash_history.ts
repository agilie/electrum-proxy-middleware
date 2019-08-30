import {WalletBtc} from "./service/wallet/wallet.btc";
import {config} from "./app/app.config";
import {WalletCreateOptionsInterface} from "./service/wallet/common/wallet-create-options.interface";
import {WalletLtc} from "./service/wallet/wallet.ltc";
import {WalletDash} from "./service/wallet/wallet.dash";
import {WalletZec} from "./service/wallet/wallet.zec";
import WalletEth from "./service/wallet/wallet.eth";

const router = require('express-async-router').AsyncRouter();

router.get('/get_history', async (req, res) => {
    const coin_type = req.query['coin_type'];
    const page = req.query['page'] || 1;
    const pageSize = req.query['pageSize'] || 10;

    const options: WalletCreateOptionsInterface = {
        userString: '',
        isProd: config.wallet.isProd,
        type: null,
        bitcore: null
    };

    var wallet = null;
    switch (coin_type) {
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
            //statements;
            break;
        }
    }

    if (wallet) {
        var result = await wallet.getHistory(page, pageSize, req);

        res.json({
            status: 'success',
            result: result
        });
    } else {
        res.json({
            status: 'error',
            result: []
        });
    }

});

// function _getElectrumConfig(type: string): ElectrumConfig {
//     let configs = electrumServersDefault[type];
//     return configs[Math.floor(Math.random() * configs.length)];
// }

module.exports = router;