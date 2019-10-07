import {CoinType} from '../types/coin.type';
import {TransactionLike} from '../types/transaction.type';

export interface WalletLike {
    readonly address: string;
    readonly type: CoinType;

    getHistory(page: number, perPage: number, req: any): Promise<TransactionLike[]>;
}
