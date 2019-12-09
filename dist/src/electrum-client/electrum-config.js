"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var coin_type_1 = require("../service/wallet/types/coin.type");
var netmode_1 = require("./types/netmode");
var protocol_type_enum_1 = require("./types/protocol.type.enum");
var MQService_1 = require("../service/MQService");
var electrum_servers_default_1 = require("../service/electrum-servers.default");
var isPortReachable = require('is-port-reachable');
var fs = require('fs');
function _getElectrumConfig(type, netMode, connectionType) {
    return __awaiter(this, void 0, void 0, function () {
        var additionalServers, configs, availableConfig, _i, _a, config, hostIsAvailable;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, MQService_1.checkQueue('Peers')];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, getServers(type, connectionType)];
                case 2:
                    additionalServers = _b.sent();
                    configs = netMode == netmode_1.Netmode.TESTNET ? electrum_servers_default_1.electrumServersDefaultTestnet[type] : electrum_servers_default_1.electrumServersDefault[type];
                    availableConfig = null;
                    _i = 0, _a = configs.concat(additionalServers);
                    _b.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    config = _a[_i];
                    return [4 /*yield*/, isPortReachable(config.port, { host: config.host })];
                case 4:
                    hostIsAvailable = _b.sent();
                    if (hostIsAvailable) {
                        availableConfig = config;
                        return [3 /*break*/, 6];
                    }
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    if (!availableConfig) {
                        throw Error('No available configs');
                    }
                    return [2 /*return*/, availableConfig];
            }
        });
    });
}
function getServers(type, connectionType) {
    return __awaiter(this, void 0, void 0, function () {
        var data, servers;
        return __generator(this, function (_a) {
            if (process.env.NODE_ENV === 'test') {
                return [2 /*return*/];
            }
            data = fs.readFileSync('electrum_servers.json', 'utf8');
            servers = JSON.parse(data).filter(function (server) { return Object.keys(coin_type_1.CoinType).includes(server.currency) && server &&
                server.peers &&
                server.currency == type.toUpperCase(); });
            if (servers.length > 0) {
                servers = servers[0].peers.map(function (server) {
                    return {
                        host: server.host,
                        port: connectionType == protocol_type_enum_1.ProtocolTypeEnum.TCP ? server.tcpPort : server.sslPort,
                        connectionType: connectionType == protocol_type_enum_1.ProtocolTypeEnum.TCP ? protocol_type_enum_1.ProtocolTypeEnum.TCP : protocol_type_enum_1.ProtocolTypeEnum.SSL,
                        version: server.version,
                    };
                });
                return [2 /*return*/, servers];
            }
            else {
                return [2 /*return*/, []];
            }
            return [2 /*return*/];
        });
    });
}
module.exports._getElectrumConfig = _getElectrumConfig;
