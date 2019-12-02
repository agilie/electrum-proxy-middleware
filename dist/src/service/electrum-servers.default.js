"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var coin_type_1 = require("./wallet/types/coin.type");
var protocol_type_enum_1 = require("../electrum-client/types/protocol.type.enum");
exports.electrumServersDefault = (_a = {},
    _a[coin_type_1.CoinType.BTC] = [
        {
            host: 'electrum1.cipig.net',
            port: 10000,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'electrum2.cipig.net',
            port: 10000,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'electrum3.cipig.net',
            port: 10000,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.TCP,
            version: 1.4,
        },
    ],
    _a[coin_type_1.CoinType.LTC] = [
        {
            host: 'electrum-ltc.bysh.me',
            port: 50001,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'electrum.ltc.xurious.com',
            port: 50001,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'backup.electrum-ltc.org',
            port: 50001,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.TCP,
            version: 1.4,
        },
    ],
    //    [CoinType.ETH]: [],
    _a[coin_type_1.CoinType.ZEC] = [
        {
            host: 'electrum1.cipig.net',
            port: 10058,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'electrum2.cipig.net',
            port: 10058,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.TCP,
            version: 1.4,
        },
    ],
    _a[coin_type_1.CoinType.DASH] = [
        {
            host: 'electrum1.cipig.net',
            port: 10061,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.TCP,
            version: 1.4,
        },
        {
            host: 'electrum2.cipig.net',
            port: 10061,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.TCP,
            version: 1.4,
        },
    ],
    _a);
exports.electrumServersDefaultTestnet = (_b = {},
    _b[coin_type_1.CoinType.BTC] = [
        {
            // testnet
            host: 'tn.not.fyi',
            port: 55002,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.SSL,
            version: 1.4,
        },
    ],
    _b[coin_type_1.CoinType.LTC] = [
        {
            // testnet
            host: 'electrum.ltc.xurious.com',
            port: 51002,
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.SSL,
            version: 1.4,
        },
    ],
    //    [CoinType.ETH]: [],
    _b[coin_type_1.CoinType.ZEC] = [
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
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.SSL,
            version: 1.4,
        },
    ],
    _b[coin_type_1.CoinType.DASH] = [
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
            connectionType: protocol_type_enum_1.ProtocolTypeEnum.SSL,
            version: 1.4,
        },
    ],
    _b);
