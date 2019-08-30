import * as bitcoreDash from '@dashevo/dashcore-lib';
import {WalletCreateOptionsInterface} from './common/wallet-create-options.interface';
import {WalletBitcoreAbstract} from './common/wallet.bitcore.abstract';
import {CoinType} from './types/coin.type';

export class WalletDash extends WalletBitcoreAbstract {
    constructor(options: WalletCreateOptionsInterface) {
        options.type = CoinType.DASH;
        options.bitcore = bitcoreDash;
        super(options);
    }
}
