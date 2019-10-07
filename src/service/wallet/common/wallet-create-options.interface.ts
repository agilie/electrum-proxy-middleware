import {CoinType} from '../types/coin.type';


export interface WalletCreateOptionsInterface {
    userString: string;
    isProd: boolean;
    type: CoinType;
    bitcore: any; // bitcore lib for bitcore wallets
}
