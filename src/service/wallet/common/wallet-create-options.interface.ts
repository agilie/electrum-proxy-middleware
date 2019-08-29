import {CoinType} from "../types/coin.type";
import {ElectrumService} from "../../electrum.service";


export interface WalletCreateOptionsInterface {
    userString: string;
    isProd: boolean;
    type: CoinType;
    electrumService: ElectrumService;
    bitcore: any; // bitcore lib for bitcore wallets
}
