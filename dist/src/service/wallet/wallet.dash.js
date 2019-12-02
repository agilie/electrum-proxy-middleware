"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bitcoreDash = __importStar(require("@dashevo/dashcore-lib"));
var wallet_bitcore_abstract_1 = require("./common/wallet.bitcore.abstract");
var coin_type_1 = require("./types/coin.type");
var WalletDash = /** @class */ (function (_super) {
    __extends(WalletDash, _super);
    function WalletDash(options) {
        var _this = this;
        options.type = coin_type_1.CoinType.DASH;
        options.bitcore = bitcoreDash;
        _this = _super.call(this, options) || this;
        return _this;
    }
    return WalletDash;
}(wallet_bitcore_abstract_1.WalletBitcoreAbstract));
exports.WalletDash = WalletDash;
