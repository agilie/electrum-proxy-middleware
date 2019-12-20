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
var coin_type_1 = require("./wallet/types/coin.type");
var protocol_type_enum_1 = require("../electrum-client/types/protocol.type.enum");
var netmode_1 = require("../electrum-client/types/netmode");
var electrum_servers_default_1 = require("./electrum-servers.default");
var amqp = require('amqplib/callback_api');
var connectionConfig = {
    protocol: 'amqp',
    hostname: '',
    port: 5672,
    username: 'dev',
    password: '',
    locale: 'en_US',
    frameMax: 0,
    heartbeat: 0,
    vhost: '/',
};
var ch = null;
var electrumConfigs = {
    testnet: electrum_servers_default_1.electrumServersDefaultTestnet,
    mainnet: electrum_servers_default_1.electrumServersDefault
};
amqp.connect(connectionConfig, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
        initMQService('Peers');
    });
});
function getElectrumConfigs(netMode, type) {
    if (netMode === void 0) { netMode = netmode_1.Netmode.MAINNET; }
    return electrumConfigs[netMode][type];
}
exports.getElectrumConfigs = getElectrumConfigs;
function processMsg(msg) {
    work(msg, function (ok) {
        try {
            if (ok) {
                ch.ack(msg);
            }
            else {
                ch.reject(msg, true);
            }
        }
        catch (e) {
            closeOnErr(e);
        }
    });
}
function work(msg, cb) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            _modifyToElectrumServers(msg.content.toString());
            console.log('Electrum servers ', msg.content.toString());
            cb(true);
            return [2 /*return*/];
        });
    });
}
function _modifyToElectrumServers(serversJson) {
    if (!serversJson) {
        return;
    }
    var supportedServers = JSON.parse(serversJson)
        .filter(function (server) { return Object.keys(coin_type_1.CoinType).includes(server.currency) && server.peers; });
    _collectSupportedServers(supportedServers);
}
function _collectSupportedServers(fullConfigServers) {
    var collectedElectrumServers = [];
    fullConfigServers.forEach(function (fullConfigServer) {
        fullConfigServer.peers.forEach(function (server) {
            _addElectrumServer(collectedElectrumServers, server, protocol_type_enum_1.ProtocolTypeEnum.TCP);
            _addElectrumServer(collectedElectrumServers, server, protocol_type_enum_1.ProtocolTypeEnum.SSL);
        });
        var currency = fullConfigServer.currency.toLowerCase();
        electrumConfigs[netmode_1.Netmode.MAINNET][currency] = collectedElectrumServers;
    });
}
function _addElectrumServer(collectedElectrumServers, server, protocol) {
    collectedElectrumServers.push({
        host: server.host,
        port: protocol === protocol_type_enum_1.ProtocolTypeEnum.SSL ? server.sslPort : server.tcpPort,
        connectionType: protocol,
        version: server.version
    });
}
function closeOnErr(err) {
    if (!err) {
        return false;
    }
    console.error('[AMQP] error', err);
    ch.close();
    return true;
}
function initMQService(queueName) {
    if (ch === null || process.env.NODE_ENV === 'test') {
        return;
    }
    ch.assertQueue(queueName, { durable: false });
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queueName);
    ch.consume('Peers', processMsg, { noAck: false });
}
process.on('exit', function (code) {
    ch.close();
    console.log("Closing rabbitmq channel");
});
