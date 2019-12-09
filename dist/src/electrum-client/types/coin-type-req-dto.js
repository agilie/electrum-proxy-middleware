"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var coin_type_1 = require("../../service/wallet/types/coin.type");
var netmode_1 = require("./netmode");
var protocol_type_enum_1 = require("./protocol.type.enum");
var CoinTypeReqDTO = /** @class */ (function () {
    function CoinTypeReqDTO() {
        this.netMode = netmode_1.Netmode.MAINNET;
    }
    __decorate([
        class_validator_1.IsEnum(coin_type_1.CoinType)
    ], CoinTypeReqDTO.prototype, "coinType", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(netmode_1.Netmode)
    ], CoinTypeReqDTO.prototype, "netMode", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(protocol_type_enum_1.ProtocolTypeEnum)
    ], CoinTypeReqDTO.prototype, "connectionType", void 0);
    return CoinTypeReqDTO;
}());
exports.CoinTypeReqDTO = CoinTypeReqDTO;
