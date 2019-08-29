import {CoinMap, CoinType} from "./wallet/types/coin.type";
import {ElectrumConfig} from "./wallet/types/electrum.config";

export const electrumServersDefault: CoinMap<ElectrumConfig[]> = {
    [CoinType.BTC]: [
        {
            ip: 'electrum1.cipig.net',
            port: 10000,
            connectionType: 'tcp',
            version: 1.4,
        },
        {
            ip: 'electrum2.cipig.net',
            port: 10000,
            connectionType: 'tcp',
            version: 1.4,
        },
        {
            ip: 'electrum3.cipig.net',
            port: 10000,
            connectionType: 'tcp',
            version: 1.4,
        },
    ],
    [CoinType.LTC]: [
        {
            ip: 'electrum-ltc.bysh.me',
            port: 50001,
            connectionType: 'tcp',
            version: 1.4,
        },
        {
            ip: 'electrum.ltc.xurious.com',
            port: 50001,
            connectionType: 'tcp',
            version: 1.4,
        },
        {
            ip: 'backup.electrum-ltc.org',
            port: 50001,
            connectionType: 'tcp',
            version: 1.4,
        },
    ],
    [CoinType.ETH]: [],
    [CoinType.ZEC]: [
        {
            ip: 'electrum1.cipig.net',
            port: 10058,
            connectionType: 'tcp',
            version: 1.4,
        },
        {
            ip: 'electrum2.cipig.net',
            port: 10058,
            connectionType: 'tcp',
            version: 1.4,
        },
    ],
    [CoinType.DASH]: [
        {
            ip: 'electrum1.cipig.net',
            port: 10061,
            connectionType: 'tcp',
            version: 1.4,
        },
        {
            ip: 'electrum2.cipig.net',
            port: 10061,
            connectionType: 'tcp',
            version: 1.4,
        },
    ],
};

export const electrumServersDefaultTestnet: CoinMap<ElectrumConfig[]> = {
    [CoinType.BTC]: [
        // {
        //     // testnet
        //     ip: 'tn.not.fyi',
        //     port: 55002,
        //     connectionType: 'ssl',
        //     version: 1.4,
        // },
        {
            // testnet
            ip: 'electrumx-test.1209k.com',
            port: 50002,
            connectionType: 'ssl',
            version: 1.4,
        },
    ],
    [CoinType.LTC]: [
        {
            // testnet
            ip: 'electrum.ltc.xurious.com',
            port: 51002,
            connectionType: 'ssl',
            version: 1.4,
        },
    ],
    [CoinType.ETH]: [],
    [CoinType.ZEC]: [
        // {
        //     // TODO find testnet for ZEC
        //     ip: 'tn.not.fyi',
        //     port: 55002,
        //     connectionType: 'ssl',
        //     version: 1.4,
        // },
        {
            ip: 'electrumx-test.1209k.com',
            port: 50002,
            connectionType: 'ssl',
            version: 1.4,
        },
    ],
    [CoinType.DASH]: [
        // {
        //     // TODO find testnet for DASH
        //     ip: 'tn.not.fyi',
        //     port: 55002,
        //     connectionType: 'ssl',
        //     version: 1.4,
        // },
        {
            ip: 'electrumx-test.1209k.com',
            port: 50002,
            connectionType: 'ssl',
            version: 1.4,
        },
    ],
};
