

import * as bitcoreDash from '@dashevo/dashcore-lib';
import {WalletCreateOptionsInterface} from "./common/wallet-create-options.interface";
import {WalletBitcoreAbstract} from "./common/wallet.bitcore.abstract";
import {CoinType} from "./types/coin.type";

export class WalletDash extends WalletBitcoreAbstract {
    constructor(options: WalletCreateOptionsInterface) {
        options.type = CoinType.DASH;
        options.bitcore = bitcoreDash;
        super(options);
    }
}

/*
http://faucet.test.dash.crowdnode.io/

CrowdNode tDASH Faucet
yWZej9A9WvxcP7XaYaTRe7njZ8FtTVfo1Y
Success! You have been awarded with 136.6686 tDASH!

Please donate to keep this faucet running:

yWdXnYxGbouNoo8yMvcbZmZ3Gdp6BpySxL

MultiFaucet Beta v. 0.8.3
Faucet balance: 139,469.5846

Average payout: 139.5251

4,439 payouts
 */
