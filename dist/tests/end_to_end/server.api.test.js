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
    MockElectrumClient.prototype.server_version = function (client_name, protocol_version) {
        return Promise.resolve(['ElectrumX 1.13.0', '1.4']);
    };
    MockElectrumClient.prototype.server_features = function () {
        return Promise.resolve({
            'hosts': {}, 'pruning': null,
            'server_version': 'ElectrumX 1.13.0',
            'protocol_min': '1.4', 'protocol_max': '1.4.2',
            'genesis_hash': '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
            'hash_function': 'sha256', 'services': []
        });
    };
    MockElectrumClient.prototype.server_banner = function () {
        return Promise.resolve('You are connected to an ElectrumX 1.13.0 server.');
    };
    MockElectrumClient.prototype.serverDonation_address = function () {
        return Promise.resolve('1BWwXJH3q6PRsizBkSGm2Uw4Sz1urZ5sCj');
    };
    MockElectrumClient.prototype.server_addPeer = function () {
        return Promise.resolve(false);
    };
    MockElectrumClient.prototype.serverPeers_subscribe = function () {
        return Promise.resolve(['107.150.45.210',
            'e.anonyhost.org',
            ['v1.0', 'p10000', 't', 's995']]);
    };
    MockElectrumClient.prototype.server_ping = function () {
        return Promise.resolve(null);
    };
    return MockElectrumClient;
}());
describe('Server methods', function () {
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
    it('identify the client to the server and negotiate the protocol version', function () {
        return __awaiter(this, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = { status: 'success', result: ['ElectrumX 1.13.0', '1.4'] };
                        return [4 /*yield*/, supertest_1.default(app)
                                .get('/server/version')
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
    it('return a list of features and services supported by the server', function () {
        return __awaiter(this, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            'status': 'success',
                            'result': {
                                'hosts': {}, 'pruning': null,
                                'server_version': 'ElectrumX 1.13.0',
                                'protocol_min': '1.4', 'protocol_max': '1.4.2',
                                'genesis_hash': '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
                                'hash_function': 'sha256', 'services': []
                            }
                        };
                        return [4 /*yield*/, supertest_1.default(app)
                                .get('/server/features')
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
    it('return a server banner', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(app)
                            .get('/server/banner')
                            .query(options())
                            .expect(200)
                            .expect('You are connected to an ElectrumX 1.13.0 server.')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('return a server donation address', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(app)
                            .get('/server/donation-address')
                            .query(options())
                            .expect(200)
                            .expect({ status: 'success', result: '1BWwXJH3q6PRsizBkSGm2Uw4Sz1urZ5sCj' })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('a newly-started server uses this call to get itself into other servers’ peers lists', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(app)
                            .get('/server/add_peer')
                            .query(options())
                            .expect(200)
                            .expect({ status: 'success', result: false })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('return a list of peer servers', function () {
        return __awaiter(this, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            status: 'success', result: ['107.150.45.210',
                                'e.anonyhost.org',
                                ['v1.0', 'p10000', 't', 's995']]
                        };
                        return [4 /*yield*/, supertest_1.default(app)
                                .get('/server/get-peers')
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
    it('ping the server to ensure it is responding, and to keep the session alive.', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(app)
                            .get('/server/ping')
                            .query(options())
                            .expect(200)
                            .expect({ status: 'success', result: null })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
