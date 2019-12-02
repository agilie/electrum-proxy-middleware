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
var netmode_1 = require("../../../electrum-client/types/netmode");
var WalletBitcoreAbstract = /** @class */ (function () {
    function WalletBitcoreAbstract(options) {
        this._bitcore = options.bitcore;
        this.type = options.type;
        this.netMode = options.netMode;
        var privateKey = this._getPrivateKey(options.userString);
        this.address = privateKey.toAddress().toString();
        var script = this._getScript(privateKey.toAddress());
        this._scriptHEX = script.toHex();
        this._scriptHash = this._getScriptHash(script);
    }
    WalletBitcoreAbstract.prototype.getHistory = function (page, pageSize, req) {
        return __awaiter(this, void 0, void 0, function () {
            var transactions, result, i, tx, txRaw, txObj, txData, timestamp, blockHeader, appTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.locals.ecl.blockchainScripthash_getHistory(this._scriptHash)];
                    case 1:
                        transactions = _a.sent();
                        if (page && pageSize && Number(page) && page > 0) {
                            transactions = transactions.slice(Number(page - 1) * pageSize, (page * pageSize));
                        }
                        result = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < transactions.length)) return [3 /*break*/, 9];
                        tx = transactions[i];
                        return [4 /*yield*/, req.locals.ecl.blockchainTransaction_get(tx.tx_hash, req.query.verbose && req.query.verbose === 'true' ? true : null, null)];
                    case 3:
                        txRaw = _a.sent();
                        txObj = new this._bitcore.Transaction(txRaw).toObject();
                        return [4 /*yield*/, this._getTxData(txObj, req)];
                    case 4:
                        txData = _a.sent();
                        timestamp = void 0;
                        if (!(tx.height && tx.height > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, req.locals.ecl.blockchainBlock_getHeader(tx.height, req.locals.ecl.version)];
                    case 5:
                        blockHeader = _a.sent();
                        if (typeof blockHeader === 'string') {
                            timestamp = new this._bitcore.BlockHeader.fromString(blockHeader).timestamp;
                        }
                        else {
                            timestamp = blockHeader.timestamp;
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        timestamp = 1;
                        _a.label = 7;
                    case 7:
                        appTx = {
                            hash: tx.txid,
                            value: +txData.value / 1e8 + '',
                            timestamp: timestamp * 1000,
                            fee: +txData.fee / 1e8 + '',
                            status: tx.height > 0 ? 'completed' : 'incompleted',
                        };
                        result.push(appTx);
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 2];
                    case 9:
                        req.locals.ecl.close();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    // prettier-ignore
    WalletBitcoreAbstract.prototype._getTxData = function (txObjext, req) {
        return __awaiter(this, void 0, void 0, function () {
            var inputs, totalOut, myIn, totalIn, myOut, fee;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (txObjext.inputs.length > 20 || (txObjext.inputs.length <= 0 && txObjext.outputs.length <= 0)) {
                            // too match inputs to calculate
                            return [2 /*return*/, {
                                    value: '...',
                                    fee: '...',
                                }];
                        }
                        return [4 /*yield*/, this._parseCoreInputs(txObjext, req)];
                    case 1:
                        inputs = _a.sent();
                        totalOut = txObjext.outputs.reduce(function (acc, out) { return acc + Number(out.satoshis); }, 0);
                        myIn = txObjext.outputs //
                            .filter(function (out) { return out.script === _this._scriptHEX; })
                            .reduce(function (acc, out) { return acc + Number(out.satoshis); }, 0);
                        totalIn = inputs.reduce(function (acc, out) { return acc + Number(out.satoshis); }, 0);
                        myOut = inputs //
                            .filter(function (out) { return out.script === _this._scriptHEX; })
                            .reduce(function (acc, out) { return acc + Number(out.satoshis); }, 0);
                        fee = totalIn - totalOut;
                        return [2 /*return*/, {
                                fee: fee + '',
                                value: myIn - myOut + fee + '',
                            }];
                }
            });
        });
    };
    WalletBitcoreAbstract.prototype._parseCoreInputs = function (txObjext, req) {
        var _this = this;
        var result = [];
        txObjext.inputs
            .forEach(function (input) {
            var txPromise = req.locals.ecl.blockchainTransaction_get(input.prevTxId, null, null).then(function (rawTx) {
                var txObj = new _this._bitcore.Transaction(rawTx).toObject();
                return txObj.outputs[input.outputIndex];
            });
            result.push(txPromise);
        });
        return Promise.all(result);
    };
    WalletBitcoreAbstract.prototype._getScript = function (address) {
        return this._bitcore.Script.buildPublicKeyHashOut(address);
    };
    WalletBitcoreAbstract.prototype._getScriptHash = function (script) {
        var bitcore = this._bitcore;
        var scriptBuffer = script.toBuffer();
        var scriptHash = bitcore.crypto.Hash.sha256(scriptBuffer);
        var reversedHash = Buffer.from(scriptHash.reverse());
        return reversedHash.toString('hex');
    };
    WalletBitcoreAbstract.prototype._getPrivateKey = function (userString) {
        var bitcore = this._bitcore;
        var buf = Buffer.from(userString);
        var hashBuffer = bitcore.crypto.Hash.sha256(buf);
        var bn = bitcore.crypto.BN.fromBuffer(hashBuffer);
        return new bitcore.PrivateKey(bn, this._getNetConfig());
    };
    WalletBitcoreAbstract.prototype._getNetConfig = function () {
        if (this.netMode === netmode_1.Netmode.TESTNET) {
            return this._bitcore.Networks.testnet;
        }
        return this._bitcore.Networks.mainnet;
    };
    return WalletBitcoreAbstract;
}());
exports.WalletBitcoreAbstract = WalletBitcoreAbstract;
