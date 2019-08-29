import {WalletBtc} from "./service/wallet/wallet.btc";
import {config} from "./app/app.config";
import {WalletCreateOptionsInterface} from "./service/wallet/common/wallet-create-options.interface";
import {ElectrumConfig} from "./service/wallet/types/electrum.config";
import {electrumServersDefault} from "../../electrum-servers.default";

const router = require('express-async-router').AsyncRouter();

router.get('/get_history', async (req, res) => {
    const coin_type = req.query['coin_type'];

    const options: WalletCreateOptionsInterface = {
        userString: '',
        isProd: config.wallet.isProd,
        type: null,
        bitcore: null
    };

    var btc_wallet = new WalletBtc(options);

    var result = await btc_wallet.getHistory(1, 1, req);

    res.json({
        status: 'success',
        result: result
    });

});

// function _getElectrumConfig(type: string): ElectrumConfig {
//     let configs = electrumServersDefault[type];
//     return configs[Math.floor(Math.random() * configs.length)];
// }

module.exports = router;