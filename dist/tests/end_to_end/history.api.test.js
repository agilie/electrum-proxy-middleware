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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
    MockElectrumClient.prototype.blockchainTransaction_get = function () {
        return Promise.resolve('010000000156fb6e22304b6d542' +
            'e5d8ca5ad40352f00b664b7142e2cfbdbcb16b4e4b300b2000000006b483045022100975e5872' +
            '56f91d50f719364024a978d3df0248374061c97bfe4560ec1beab67402206cd1b231430a613392c1' +
            '3bff9e996285577a68d48fa94c769bb6df7c021f3e6b012103e4182a36fb4efa245069e1e68d2492d6acd' +
            '33c7583eacbde863e91af08d16029ffffffff0200451a00000000001976a9144a7eb59b84666dad56622a8519e' +
            '2c22d0ecb824888ac10270000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac00000000');
    };
    MockElectrumClient.prototype.blockchainBlock_getHeader = function (height, protocolVersion) {
        return Promise.resolve('0100000085144a84488ea8' +
            '8d221c8bd6c059da090e88f8a2c99690ee55dbba4e00000000e11c48fecdd9e7251' +
            '0ca84f023370c9a38bf91ac5cae88019bee94d24528526344c36649ffff001d1d03e477');
    };
    MockElectrumClient.prototype.blockchainScripthash_getHistory = function (address) {
        return Promise.resolve([{
                tx_hash: '66dff43cd32a898592ba294b3b99cdd7aa60773faccf3b426fb4171a1e7336a1',
                height: 299254
            },
            {
                tx_hash: '3604bd8ac5c600e9d835991e46cbf8baa420c8692f88d83a3e7b4adc44f11e01',
                height: 299254
            },
            {
                tx_hash: 'f807e5b5254ec6eeb9c2ac9d7754be9ed941a06b2d31f7b9f79c7050b52ad66a',
                height: 299254
            },
            {
                tx_hash: 'e19cd13add23c9eb437f3a02a81d9c4a1520bd731f1c2fa363c38ea671ceaa06',
                height: 299254
            }]);
    };
    return MockElectrumClient;
}());
describe('History methods', function () {
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
        return __assign({ address: '1BWwXJH3q6PRsizBkSGm2Uw4Sz1urZ5sCj', coinType: 'btc' }, params);
    }
    it('return the confirmed and unconfirmed history of a script hash', function () {
        return __awaiter(this, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            status: 'success',
                            result: [{
                                    value: '0',
                                    timestamp: 1231471428000,
                                    fee: '-0.0001',
                                    status: 'completed'
                                },
                                {
                                    value: '0',
                                    timestamp: 1231471428000,
                                    fee: '-0.0001',
                                    status: 'completed'
                                },
                                {
                                    value: '0',
                                    timestamp: 1231471428000,
                                    fee: '-0.0001',
                                    status: 'completed'
                                }],
                            time: 6.884237
                        };
                        return [4 /*yield*/, supertest_1.default(app).get('/history/get_history')
                                .query(options())
                                .expect(200)
                                .expect(function (res) {
                                res.body.time = 6.884237;
                                res.body.result = [{
                                        value: '0',
                                        timestamp: 1231471428000,
                                        fee: '-0.0001',
                                        status: 'completed'
                                    },
                                    {
                                        value: '0',
                                        timestamp: 1231471428000,
                                        fee: '-0.0001',
                                        status: 'completed'
                                    },
                                    {
                                        value: '0',
                                        timestamp: 1231471428000,
                                        fee: '-0.0001',
                                        status: 'completed'
                                    }];
                            })
                                .expect(expected)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
