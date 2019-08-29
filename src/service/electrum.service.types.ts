export interface ElectrumBalanceResponse {
    msg: string;
    result: {
        confirmed: number; // satoshi 1e-8
        unconfirmed: number;
    };
}

export interface ElectrumUTXOsResponse {
    msg: string;
    result: UTXOElectrum[];
}

export interface UTXOElectrum {
    tx_hash: string; // the same as tx_id
    tx_pos: number;
    height: number;
    value: number;
}

export interface GetListtransactionsResponse {
    msg: string;
    result: {
        txsCount: number;
        pageSize: number;
        pagesTotal: number;
        maxHistoryDepth: number;
        page: string;
        transactions: TxRaw[];
    };
}

export interface TxRaw {
    txid: string;
    height: number; // block height if transaction completed
    raw: string;
}

export interface GetTxResponce {
    msg: string;
    result: string;
}

export interface GetBlockInfoResponce {
    msg: string;
    result: string | BTCBlockV12; // string for version 1.4 | object for version 1.2
}

export interface BTCBlockV12 {
    version: number;
    prev_block_hash: string;
    merkle_root: string;
    reserved: string;
    timestamp: number;
    bits: number;
    nonce: string;
    block_height: number;
}

export interface EstimateFeeResponce {
    msg: string;
    result: string;
}

export interface ElectrumPushTxResponse {
    msg: string;
    result: string; // txID if success
}
