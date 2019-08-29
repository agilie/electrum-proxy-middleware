import {CoinType} from "../types/coin.type";
import {TransactionLike} from "../types/transaction.type";
import {FeeType} from "./fee-type.enum";

export interface WalletLike {
    readonly address: string;
    readonly type: CoinType;

    readonly balance: number;
    readonly balanceShort: string;
    readonly balanceUSD: string;

    getHistory(page: number, perPage: number): Promise<TransactionLike[]>;

    isAddressValid(address: string): boolean;

    getFee(amount: string, feeType: FeeType): Promise<string>;

    /*
    @amount in coins
     */
    send(amount: string, address: string, phrase: string, userGasPrice: number, feeType: FeeType): Promise<void>;

    destroy(): void;
}
