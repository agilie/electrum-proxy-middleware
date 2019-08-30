import {WalletLike} from "./common/wallet.interface";
import {CoinType} from "./types/coin.type";
import {WalletCreateOptionsInterface} from "./common/wallet-create-options.interface";
import {TransactionLike} from "./types/transaction.type";
import {PriceProviderService} from "../price-provider.service";
import {EtherscanProvider} from "ethers/providers";
import { sha256 } from 'js-sha256';
import {ethers} from "ethers";
import {Wallet} from "ethers/wallet";




export default class WalletEth implements WalletLike {
    readonly type = CoinType.ETH;
    readonly address: string;
    readonly isProd: boolean;
    private _provider: EtherscanProvider;
    readonly priceProvider: PriceProviderService;


    constructor(options: WalletCreateOptionsInterface) {
        this.isProd = options.isProd;
        this.priceProvider = options.priceProvider;

        const walletConnect = this._getWalletConnect(options.userString);
        this.address = walletConnect.address;
        this._provider = this._getProvider();
    }


    async getHistory(page: number, perPage: number): Promise<TransactionLike[]> {
        const txHistory = await this._provider.getHistory(this.address, page, perPage);

        const transactions: TransactionLike[] = [];

        for (let i = 0; i < txHistory.length; i++) {
            const rawTx = txHistory[i];
            const receipt = await this._provider.getTransactionReceipt(rawTx.hash);

            const prefix = rawTx.from === this.address ? '-' : '';
            const value: string = prefix + ethers.utils.formatEther(rawTx.value);

            transactions.push({
                hash: rawTx.hash,
                value: value,
                timestamp: rawTx.timestamp * 1000,
                fee: ethers.utils.formatEther(receipt.gasUsed.mul(rawTx.gasPrice)),
                status: receipt.status === 1 ? 'completed' : 'failed',
            });
        }
        return transactions;
    }




    private _getProvider(): EtherscanProvider {
        if (this.isProd) {
            return new ethers.providers.EtherscanProvider('homestead'); // mainnet
        }
        return new ethers.providers.EtherscanProvider('ropsten'); // testnet
    }


    private _getWalletConnect(userStrung: string): Wallet {
        const hash = sha256(userStrung);

        let walletConnect = new Wallet(Buffer.from(hash, 'hex'));
        walletConnect = walletConnect.connect(this._getProvider());

        return walletConnect;
    }
}
