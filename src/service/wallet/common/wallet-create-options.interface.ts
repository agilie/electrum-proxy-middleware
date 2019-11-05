import {CoinType} from '../types/coin.type';
import {NetmodeTypeEnum} from '../../../electrum-client/types/netmode.type.enum';

export interface WalletCreateOptionsInterface {
    userString: string;
    netMode: NetmodeTypeEnum;
    type: CoinType;
    bitcore: any; // bitcore lib for bitcore wallets
}
