"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var express_1 = __importDefault(require("express"));
var src_1 = require("../../src");
var app = express_1.default();
var _a = require('../../src/electrum-client/electrum_client'), ElectrumClient = _a.ElectrumClient, overrideClient = _a.overrideClient;
var originalElectrumClient = ElectrumClient;
var MockElectrumClient = /** @class */ (function () {
    function MockElectrumClient() {
    }
    MockElectrumClient.prototype.connect = function () {
        return;
    };
    MockElectrumClient.prototype.close = function () {
        return;
    };
    MockElectrumClient.prototype.blockchainScripthash_getBalance = function () {
        return Promise.resolve({
            'confirmed': '1.03873966',
            'unconfirmed': '0.236844'
        });
    };
    MockElectrumClient.prototype.blockchainScripthash_listunspent = function () {
        return Promise.resolve([
            {
                'tx_pos': 0,
                'value': 45318048,
                'tx_hash': '9f2c45a12db0144909b5db269415f7319179105982ac70ed80d76ea79d923ebf',
                'height': 437146
            },
            {
                'tx_pos': 0,
                'value': 919195,
                'tx_hash': '3d2290c93436a3e964cfc2f0950174d8847b1fbe3946432c4784e168da0f019f',
                'height': 441696
            }
        ]);
    };
    MockElectrumClient.prototype.blockchainScripthash_getMempool = function () {
        return Promise.resolve([
            {
                'tx_hash': '45381031132c57b2ff1cbe8d8d3920cf9ed25efd9a0beb764bdb2f24c7d1c7e3',
                'height': 0,
                'fee': 24310
            }
        ]);
    };
    return MockElectrumClient;
}());
describe('Scripthash methods', function () {
    beforeAll(function () {
        app.use(src_1.router);
    });
    beforeEach(function () {
        overrideClient(MockElectrumClient);
    });
    afterAll(function () {
        overrideClient(originalElectrumClient);
    });
    function options(params) {
        if (params === void 0) { params = {}; }
        return __assign({ coinType: 'btc', scripthash: '20b360e68b4fe6d1eb460e45434f756fa1582ed687167898f9a716435ecd737f' }, params);
    }
    it('return the confirmed and unconfirmed balances of a script hash', function () {
        return __awaiter(this, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            'status': 'success', 'result': {
                                'confirmed': '1.03873966',
                                'unconfirmed': '0.236844'
                            }
                        };
                        return [4 /*yield*/, supertest_1.default(app)
                                .get('/scripthash/balance')
                                .query(options())
                                .expect(200)
                                .expect(expected)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('return an ordered list of UTXOs sent to a script hash', function () {
        return __awaiter(this, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            status: 'success', result: [
                                {
                                    'tx_pos': 0,
                                    'value': 45318048,
                                    'tx_hash': '9f2c45a12db0144909b5db269415f7319179105982ac70ed80d76ea79d923ebf',
                                    'height': 437146
                                },
                                {
                                    'tx_pos': 0,
                                    'value': 919195,
                                    'tx_hash': '3d2290c93436a3e964cfc2f0950174d8847b1fbe3946432c4784e168da0f019f',
                                    'height': 441696
                                }
                            ]
                        };
                        return [4 /*yield*/, supertest_1.default(app)
                                .get('/scripthash/listunspent')
                                .query(options())
                                .expect(200)
                                .expect(expected)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('return the unconfirmed transactions of a script hash.', function () {
        return __awaiter(this, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            status: 'success', result: [
                                {
                                    'tx_hash': '45381031132c57b2ff1cbe8d8d3920cf9ed25efd9a0beb764bdb2f24c7d1c7e3',
                                    'height': 0,
                                    'fee': 24310
                                }
                            ]
                        };
                        return [4 /*yield*/, supertest_1.default(app)
                                .get('/scripthash/get_mempool')
                                .query(options())
                                .expect(200)
                                .expect(expected)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
