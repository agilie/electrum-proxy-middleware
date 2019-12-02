import {CoinType} from '../types/coin.type';
import {Netmode} from '../../../electrum-client/types/netmode';

export interface WalletCreateOptionsInterface {
    addressHEX: string;
    netMode: Netmode;
    type: CoinType;
    bitcore: any; // bitcore lib for bitcore wallets
}
