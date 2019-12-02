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
var historyHandler = require('../../src/history');
describe('getHistoryHandler method', function () {
    it('return valid ', function () {
        return __awaiter(this, void 0, void 0, function () {
            var mockReq, actual, moqRes, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockReq = {
                            query: { address: '8b01df4e368ea28f8dc0423bcf7a4923e3a12d307c875e47a0cfbf90b5c39161', coinType: 'btc' },
                            locals: {
                                ecl: {
                                    blockchainScripthash_getHistory: function () { return 'test'; },
                                    blockchainTransaction_get: function () { return Promise.resolve('010000000156fb6e22304b6d542' +
                                        'e5d8ca5ad40352f00b664b7142e2cfbdbcb16b4e4b300b2000000006b483045022100975e5872' +
                                        '56f91d50f719364024a978d3df0248374061c97bfe4560ec1beab67402206cd1b231430a613392c1' +
                                        '3bff9e996285577a68d48fa94c769bb6df7c021f3e6b012103e4182a36fb4efa245069e1e68d2492d6acd' +
                                        '33c7583eacbde863e91af08d16029ffffffff0200451a00000000001976a9144a7eb59b84666dad56622a8519e' +
                                        '2c22d0ecb824888ac10270000000000001976a9149a1c78a507689f6f54b847ad1cef1e614ee23f1e88ac00000000'); },
                                    close: function () { },
                                },
                            }
                        };
                        actual = {};
                        moqRes = {
                            json: function (data) {
                                actual = data;
                            }
                        };
                        expected = {
                            status: 'success',
                            result: [{
                                    hash: undefined,
                                    value: '-0.0001',
                                    timestamp: 1000,
                                    fee: '-0.0001',
                                    status: 'incompleted'
                                },
                                {
                                    hash: undefined,
                                    value: '-0.0001',
                                    timestamp: 1000,
                                    fee: '-0.0001',
                                    status: 'incompleted'
                                },
                                {
                                    hash: undefined,
                                    value: '-0.0001',
                                    timestamp: 1000,
                                    fee: '-0.0001',
                                    status: 'incompleted'
                                },
                                {
                                    hash: undefined,
                                    value: '-0.0001',
                                    timestamp: 1000,
                                    fee: '-0.0001',
                                    status: 'incompleted'
                                }]
                        };
                        return [4 /*yield*/, historyHandler.getHistoryHandler(mockReq, moqRes)];
                    case 1:
                        _a.sent();
                        expect(actual.status).toEqual(expected.status);
                        expect(actual.result).toEqual(expected.result);
                        return [2 /*return*/];
                }
            });
        });
    });
});
