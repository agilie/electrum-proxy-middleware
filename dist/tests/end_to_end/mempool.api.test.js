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
var coin_type_1 = require("../../src/service/wallet/types/coin.type");
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
    MockElectrumClient.prototype.mempool_getFeeHistogram = function () {
        return Promise.resolve([[99, 121398],
            [98, 128245], [59, 141390],
            [45, 92447], [36, 136348],
            [30, 166493], [25, 205960],
            [23, 176537], [19, 318423],
            [18, 175663], [16, 230282],
            [14, 284033], [11, 813726],
            [10, 133802], [9, 528720],
            [8, 74020], [5, 779732],
            [4, 179452], [2, 1712676], [1, 1946317]]);
    };
    return MockElectrumClient;
}());
describe('Mempool methods', function () {
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
        return __assign({ coinType: coin_type_1.CoinType.BTC }, params);
    }
    it('return a histogram of the fee rates paid by transactions in the memory pool, weighted by transaction size', function () {
        return __awaiter(this, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            'status': 'success', 'result': [[99, 121398], [98, 128245], [59, 141390], [45, 92447], [36, 136348],
                                [30, 166493], [25, 205960], [23, 176537], [19, 318423], [18, 175663], [16, 230282], [14, 284033],
                                [11, 813726], [10, 133802], [9, 528720], [8, 74020], [5, 779732], [4, 179452], [2, 1712676], [1, 1946317]]
                        };
                        return [4 /*yield*/, supertest_1.default(app)
                                .get('/mempool/get_fee_histogram')
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
