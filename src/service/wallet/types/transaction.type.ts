export interface TransactionLike {
    hash: string; // tx ID
    value: string; // value in coins NOT satoshi NOT wei
    timestamp: number;
    fee: string; // value in coins NOT satoshi NOT wei
    status: 'completed' | 'incompleted' | 'failed';
}
