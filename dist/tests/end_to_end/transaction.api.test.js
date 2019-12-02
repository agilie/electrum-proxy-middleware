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
    MockElectrumClient.prototype.blockchainTransaction_get = function () {
        return Promise.resolve('0100000001a64a43a90cc604a09f2b82fbaa' +
            '7792c9d747063f21c56d924c43ec13e07e69ca05000000' +
            '6b483045022100955b61c1731a1e996558462124f9da29c6c' +
            'e1ab6d71f73e872524e783ef6e9402207b0ecc9130bc385d2e88f29' +
            'b1095135ae76e581a2e855de763455797f8e483480121039fe71e7c19502' +
            '5b193f0255f5c5555be7eab8c6dac66dbfb3c2dff90bbe6565dffffffff0550c' +
            '30000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c3' +
            '0000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000' +
            '000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000000000001' +
            '976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac40c84c00000000001976a9142d' +
            '37ceaf73a2d831a550d06d03ffa4f5c53fade188ac00000000');
    };
    MockElectrumClient.prototype.blockchainTransaction_getMerkle = function () {
        return Promise.resolve({
            'merkle': [
                '713d6c7e6ce7bbea708d61162231eaa8ecb31c4c5dd84f81c20409a90069cb24',
                '03dbaec78d4a52fbaf3c7aa5d3fccd9d8654f323940716ddf5ee2e4bda458fde',
                'e670224b23f156c27993ac3071940c0ff865b812e21e0a162fe7a005d6e57851',
                '369a1619a67c3108a8850118602e3669455c70cdcdb89248b64cc6325575b885',
                '4756688678644dcb27d62931f04013254a62aeee5dec139d1aac9f7b1f318112',
                '7b97e73abc043836fd890555bfce54757d387943a6860e5450525e8e9ab46be5',
                '61505055e8b639b7c64fd58bce6fc5c2378b92e025a02583303f69930091b1c3',
                '27a654ff1895385ac14a574a0415d3bbba9ec23a8774f22ec20d53dd0b5386ff',
                '5312ed87933075e60a9511857d23d460a085f3b6e9e5e565ad2443d223cfccdc',
                '94f60b14a9f106440a197054936e6fb92abbd69d6059b38fdf79b33fc864fca0',
                '2d64851151550e8c4d337f335ee28874401d55b358a66f1bafab2c3e9f48773d'
            ],
            'block_height': 450538,
            'pos': 710
        });
    };
    MockElectrumClient.prototype.blockchainTransaction_idFromPos = function () {
        return Promise.resolve({
            "tx_hash": "fc12dfcb4723715a456c6984e298e00c479706067da81be969e8085544b0ba08",
            "merkle": [
                "928c4275dfd6270349e76aa5a49b355eefeb9e31ffbe95dd75fed81d219a23f8",
                "5f35bfb3d5ef2ba19e105dcd976928e675945b9b82d98a93d71cbad0e714d04e",
                "f136bcffeeed8844d54f90fc3ce79ce827cd8f019cf1d18470f72e4680f99207",
                "6539b8ab33cedf98c31d4e5addfe40995ff96c4ea5257620dfbf86b34ce005ab",
                "7ecc598708186b0b5bd10404f5aeb8a1a35fd91d1febbb2aac2d018954885b1e",
                "a263aae6c470b9cde03b90675998ff6116f3132163911fafbeeb7843095d3b41",
                "c203983baffe527edb4da836bc46e3607b9a36fa2c6cb60c1027f0964d971b29",
                "306d89790df94c4632d652d142207f53746729a7809caa1c294b895a76ce34a9",
                "c0b4eff21eea5e7974fe93c62b5aab51ed8f8d3adad4583c7a84a98f9e428f04",
                "f0bd9d2d4c4cf00a1dd7ab3b48bbbb4218477313591284dcc2d7ca0aaa444e8d",
                "503d3349648b985c1b571f59059e4da55a57b0163b08cc50379d73be80c4c8f3"
            ]
        });
    };
    return MockElectrumClient;
}());
describe('Transaction methods', function () {
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
        return __assign({ coinType: 'btc' }, params);
    }
    it('return a histogram of the fee rates paid by transactions in the memory pool, weighted by transaction size', function () {
        return __awaiter(this, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            'status': 'success',
                            'result': '0100000001a64a43a90cc604a09f2b82fbaa' +
                                '7792c9d747063f21c56d924c43ec13e07e69ca05000000' +
                                '6b483045022100955b61c1731a1e996558462124f9da29c6c' +
                                'e1ab6d71f73e872524e783ef6e9402207b0ecc9130bc385d2e88f29' +
                                'b1095135ae76e581a2e855de763455797f8e483480121039fe71e7c19502' +
                                '5b193f0255f5c5555be7eab8c6dac66dbfb3c2dff90bbe6565dffffffff0550c' +
                                '30000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c3' +
                                '0000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000' +
                                '000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac50c30000000000001' +
                                '976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac40c84c00000000001976a9142d' +
                                '37ceaf73a2d831a550d06d03ffa4f5c53fade188ac00000000'
                        };
                        return [4 /*yield*/, supertest_1.default(app)
                                .get('/transaction/get')
                                .query(options({ tx_hash: '871af2528c83ba90bd7b3fbfeac703cbd20f204f1b800ba4ec748842fcac0c9b' }))
                                .expect(200)
                                .expect(expected)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('return the merkle branch to a confirmed transaction given its hash and height.', function () {
        return __awaiter(this, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            'status': 'success',
                            'result': {
                                'merkle': [
                                    '713d6c7e6ce7bbea708d61162231eaa8ecb31c4c5dd84f81c20409a90069cb24',
                                    '03dbaec78d4a52fbaf3c7aa5d3fccd9d8654f323940716ddf5ee2e4bda458fde',
                                    'e670224b23f156c27993ac3071940c0ff865b812e21e0a162fe7a005d6e57851',
                                    '369a1619a67c3108a8850118602e3669455c70cdcdb89248b64cc6325575b885',
                                    '4756688678644dcb27d62931f04013254a62aeee5dec139d1aac9f7b1f318112',
                                    '7b97e73abc043836fd890555bfce54757d387943a6860e5450525e8e9ab46be5',
                                    '61505055e8b639b7c64fd58bce6fc5c2378b92e025a02583303f69930091b1c3',
                                    '27a654ff1895385ac14a574a0415d3bbba9ec23a8774f22ec20d53dd0b5386ff',
                                    '5312ed87933075e60a9511857d23d460a085f3b6e9e5e565ad2443d223cfccdc',
                                    '94f60b14a9f106440a197054936e6fb92abbd69d6059b38fdf79b33fc864fca0',
                                    '2d64851151550e8c4d337f335ee28874401d55b358a66f1bafab2c3e9f48773d'
                                ],
                                'block_height': 450538,
                                'pos': 710
                            }
                        };
                        return [4 /*yield*/, supertest_1.default(app)
                                .get('/transaction/get-merkle')
                                .query(options({ tx_hash: '871af2528c83ba90bd7b3fbfeac703cbd20f204f1b800ba4ec748842fcac0c9b', height: 1 }))
                                .expect(200)
                                .expect(expected)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('return a transaction hash and optionally a merkle proof, given a block height and a position in the block', function () {
        return __awaiter(this, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            'status': 'success',
                            'result': {
                                "tx_hash": "fc12dfcb4723715a456c6984e298e00c479706067da81be969e8085544b0ba08",
                                "merkle": [
                                    "928c4275dfd6270349e76aa5a49b355eefeb9e31ffbe95dd75fed81d219a23f8",
                                    "5f35bfb3d5ef2ba19e105dcd976928e675945b9b82d98a93d71cbad0e714d04e",
                                    "f136bcffeeed8844d54f90fc3ce79ce827cd8f019cf1d18470f72e4680f99207",
                                    "6539b8ab33cedf98c31d4e5addfe40995ff96c4ea5257620dfbf86b34ce005ab",
                                    "7ecc598708186b0b5bd10404f5aeb8a1a35fd91d1febbb2aac2d018954885b1e",
                                    "a263aae6c470b9cde03b90675998ff6116f3132163911fafbeeb7843095d3b41",
                                    "c203983baffe527edb4da836bc46e3607b9a36fa2c6cb60c1027f0964d971b29",
                                    "306d89790df94c4632d652d142207f53746729a7809caa1c294b895a76ce34a9",
                                    "c0b4eff21eea5e7974fe93c62b5aab51ed8f8d3adad4583c7a84a98f9e428f04",
                                    "f0bd9d2d4c4cf00a1dd7ab3b48bbbb4218477313591284dcc2d7ca0aaa444e8d",
                                    "503d3349648b985c1b571f59059e4da55a57b0163b08cc50379d73be80c4c8f3"
                                ]
                            }
                        };
                        return [4 /*yield*/, supertest_1.default(app)
                                .get('/transaction/id-from-pos')
                                .query(options({ height: 5, txPos: 1, merkle: true }))
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
