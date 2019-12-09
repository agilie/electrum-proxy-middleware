import {CoinMap, CoinType} from './wallet/types/coin.type';
import {ElectrumConfig} from './wallet/types/electrum.config';
import {ProtocolTypeEnum} from '../electrum-client/types/protocol.type.enum';

export const electrumServersDefault: CoinMap<ElectrumConfig[]> = {
    [CoinType.BTC]: [
        {
            host: 'electrum1.cipig.net',
            port: 10000,
            connectionType: ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'electrum2.cipig.net',
            port: 10000,
            connectionType: ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'electrum3.cipig.net',
            port: 10000,
            connectionType: ProtocolTypeEnum.TCP,
            version: 1.4,
        },
    ],
    [CoinType.LTC]: [
        {
            host: 'electrum-ltc.bysh.me',
            port: 50001,
            connectionType: ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'electrum.ltc.xurious.com',
            port: 50001,
            connectionType: ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'backup.electrum-ltc.org',
            port: 50001,
            connectionType: ProtocolTypeEnum.TCP,
            version: 1.4,
        },
    ],
//    [CoinType.ETH]: [],
    [CoinType.ZEC]: [
        {
            host: 'electrum1.cipig.net',
            port: 10058,
            connectionType: ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'electrum2.cipig.net',
            port: 10058,
            connectionType: ProtocolTypeEnum.TCP,
            version: 1.4,
        },
    ],
    [CoinType.DASH]: [
        {
            host: 'electrum1.cipig.net',
            port: 10061,
            connectionType: ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'electrum2.cipig.net',
            port: 10061,
            connectionType: ProtocolTypeEnum.TCP,
            version: 1.4,
        },
    ],
};

export const electrumServersDefaultTestnet: CoinMap<ElectrumConfig[]> = {
    [CoinType.BTC]: [
        // {
        //     // testnet
        //     host: 'tn.not.fyi',
        //     port: 55002,
        //     connectionType:  ProtocolTypeEnum.SSL,
        //     version: 1.4,
        // },
        {
            // testnet
            host: 'electrumx-test.1209k.com',
            port: 50002,
            connectionType: ProtocolTypeEnum.SSL,
            version: 1.4,
        },
    ],
    [CoinType.LTC]: [
        {
            // testnet
            host: 'electrumx-test.1209k.com',
            port: 50002,
            connectionType: ProtocolTypeEnum.SSL,
            version: 1.4,
        },
    ],
//    [CoinType.ETH]: [],
    [CoinType.ZEC]: [
        // {
        //     // TODO find testnet for ZEC
        //     host: 'tn.not.fyi',
        //     port: 55002,
        //     connectionType: ProtocolTypeEnum.SSL,
        //     version: 1.4,
        // },
        {
            host: 'electrumx-test.1209k.com',
            port: 50002,
            connectionType: ProtocolTypeEnum.SSL,
            version: 1.4,
        },
    ],
    [CoinType.DASH]: [
        // {
        //     // TODO find testnet for DASH
        //     host: 'tn.not.fyi',
        //     port: 55002,
        //     connectionType: ProtocolTypeEnum.SSL,
        //     version: 1.4,
        // },
        {
            host: 'electrumx-test.1209k.com',
            port: 50002,
            connectionType: ProtocolTypeEnum.SSL,
            version: 1.4,
        },
    ],
};
