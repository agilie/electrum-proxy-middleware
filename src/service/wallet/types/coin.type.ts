export enum CoinType {
    ETH = 'eth',
    BTC = 'btc',
    LTC = 'ltc',
    DASH = 'dash',
    ZEC = 'zec',
}

export type CoinMap<T> = {
    [x in CoinType]: T;
};
