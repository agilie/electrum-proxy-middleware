import * as bitcore from 'bitcore-lib';
import {WalletBitcoreAbstract} from "./common/wallet.bitcore.abstract";
import {WalletCreateOptionsInterface} from "./common/wallet-create-options.interface";
import {CoinType} from "./types/coin.type";

export class WalletLtc extends WalletBitcoreAbstract {
    constructor(options: WalletCreateOptionsInterface) {
        options.type = CoinType.LTC;
        options.bitcore = bitcore;
        super(options);
    }
}
