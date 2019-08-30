import {CoinType} from "../types/coin.type";
import {ElectrumService} from "../../electrum.service";
import {PriceProviderService} from "~/service/price-provider.service";


export interface WalletCreateOptionsInterface {
    userString: string;
    isProd: boolean;
    type: CoinType;
    priceProvider: PriceProviderService;
    electrumService: ElectrumService;
    bitcore: any; // bitcore lib for bitcore wallets
}
