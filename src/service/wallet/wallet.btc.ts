import * as bitcore from 'bitcore-lib';
import {CoinType} from "./types/coin.type";
import {WalletCreateOptionsInterface} from "./common/wallet-create-options.interface";
import {WalletBitcoreAbstract} from "./common/wallet.bitcore.abstract";


export class WalletBtc extends WalletBitcoreAbstract {
    constructor(options: WalletCreateOptionsInterface) {
        options.type = CoinType.BTC;
        options.bitcore = bitcore;
        super(options);
    }
}
