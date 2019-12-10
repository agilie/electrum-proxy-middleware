"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var electrumClient = require('../../../src/electrum-client/define-electrum-client');
var protocol_type_enum_1 = require("../../../src/electrum-client/types/protocol.type.enum");
describe('getOptions method', function () {
    describe('with configurations params', function () {
        describe('with valid configuration params', function () {
            it('return valid ElectrumConfig data', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var query, options, expected;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                query = {
                                    port: 55002,
                                    host: 'tn.not.fyi',
                                    connectionType: protocol_type_enum_1.ProtocolTypeEnum.SSL,
                                    version: 1.4
                                };
                                return [4 /*yield*/, electrumClient.getOptions(query)];
                            case 1:
                                options = _a.sent();
                                expected = {
                                    port: 55002,
                                    host: 'tn.not.fyi',
                                    connectionType: protocol_type_enum_1.ProtocolTypeEnum.SSL,
                                    version: 1.4
                                };
                                expect(options).toEqual(expected);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('with invalid configuration params', function () {
            describe('with invalid port', function () {
                describe('without port', function () {
                    it('return warning about port', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var query, error_1, warning, expected;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        query = {
                                            host: 'tn.not.fyi',
                                            connectionType: protocol_type_enum_1.ProtocolTypeEnum.SSL,
                                            version: 1.4
                                        };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, electrumClient.getOptions(query)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_1 = _a.sent();
                                        warning = error_1[0].constraints;
                                        expected = {
                                            isDefined: 'port should not be null or undefined',
                                            isNotEmpty: 'port should not be empty'
                                        };
                                        expect(warning).toEqual(expected);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
                describe('with empty port', function () {
                    it('return warning about port', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var query, error_2, warning, expected;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        query = {
                                            port: '',
                                            host: 'tn.not.fyi',
                                            connectionType: protocol_type_enum_1.ProtocolTypeEnum.SSL,
                                            version: 1.4
                                        };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, electrumClient.getOptions(query)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_2 = _a.sent();
                                        warning = error_2[0].constraints;
                                        expected = { isNotEmpty: 'port should not be empty' };
                                        expect(warning).toEqual(expected);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
            });
            describe('with invalid version', function () {
                describe('without version', function () {
                    it('return warning about version', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var query, error_3, warning, expected;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        query = {
                                            port: 55002,
                                            host: 'tn.not.fyi',
                                            connectionType: protocol_type_enum_1.ProtocolTypeEnum.SSL
                                        };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, electrumClient.getOptions(query)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_3 = _a.sent();
                                        warning = error_3[0].constraints;
                                        expected = {
                                            isDefined: 'version should not be null or undefined',
                                            isNotEmpty: 'version should not be empty'
                                        };
                                        expect(warning).toEqual(expected);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
                describe('with empty version', function () {
                    it('return warning about version', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var query, error_4, warning, expected;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        query = {
                                            port: 55002,
                                            host: 'tn.not.fyi',
                                            connectionType: protocol_type_enum_1.ProtocolTypeEnum.SSL,
                                            version: ''
                                        };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, electrumClient.getOptions(query)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_4 = _a.sent();
                                        warning = error_4[0].constraints;
                                        expected = { isNotEmpty: 'version should not be empty' };
                                        expect(warning).toEqual(expected);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
            });
            describe('with invalid connectionType', function () {
                it('return warning about connectionType', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var query, error_5, warning, expected;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    query = {
                                        port: '55002',
                                        host: 'tn.not.fyi',
                                        connectionType: 'error',
                                        version: '1.4'
                                    };
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, electrumClient.getOptions(query)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_5 = _a.sent();
                                    warning = error_5[0].constraints;
                                    expected = { isEnum: 'connectionType must be a valid enum value' };
                                    expect(warning).toEqual(expected);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            describe('with invalid host', function () {
                describe('without host', function () {
                    it('return warning about host', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var query, error_6, warning, expected;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        query = {
                                            port: '55002',
                                            connectionType: 'ssl',
                                            version: '1.4'
                                        };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, electrumClient.getOptions(query)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_6 = _a.sent();
                                        warning = error_6[0].constraints;
                                        expected = {
                                            isDefined: 'host should not be null or undefined',
                                            maxLength: 'host must be shorter than or equal to 20 characters',
                                            minLength: 'host must be longer than or equal to 0 characters',
                                            isString: 'host must be a string',
                                            isNotEmpty: 'host should not be empty'
                                        };
                                        expect(warning).toEqual(expected);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
                describe('with empty host', function () {
                    it('return warning about host', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var query, error_7, warning, expected;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        query = {
                                            port: '55002',
                                            host: '',
                                            connectionType: 'ssl',
                                            version: '1.4'
                                        };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, electrumClient.getOptions(query)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_7 = _a.sent();
                                        warning = error_7[0].constraints;
                                        expected = { isNotEmpty: 'host should not be empty' };
                                        expect(warning).toEqual(expected);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
                describe('invalid empty host', function () {
                    it('return warning about host', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var query, error_8, warning, expected;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        query = {
                                            port: '55002',
                                            host: 'ttttt.ttttt.ttttt.ttttt.ttttt',
                                            connectionType: 'ssl',
                                            version: '1.4'
                                        };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, electrumClient.getOptions(query)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_8 = _a.sent();
                                        warning = error_8[0].constraints;
                                        expected = { maxLength: 'host must be shorter than or equal to 20 characters' };
                                        expect(warning).toEqual(expected);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
            });
        });
    });
});
