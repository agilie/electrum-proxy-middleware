import * as bitcoreZcash from 'zcash-bitcore-lib';
import {CoinType} from './types/coin.type';
import {WalletCreateOptionsInterface} from './common/wallet-create-options.interface';
import {WalletBitcoreAbstract} from './common/wallet.bitcore.abstract';

export class WalletZec extends WalletBitcoreAbstract {
    constructor(options: WalletCreateOptionsInterface) {
        options.type = CoinType.ZEC;
        options.bitcore = bitcoreZcash;
        super(options);
    }
}
