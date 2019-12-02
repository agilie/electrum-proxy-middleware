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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var coin_type_req_dto_1 = require("./coin-type-req-dto");
var class_transformer_1 = require("class-transformer");
require("reflect-metadata");
var HistoryReqDTO = /** @class */ (function (_super) {
    __extends(HistoryReqDTO, _super);
    function HistoryReqDTO() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = 1;
        _this.pageSize = 10;
        return _this;
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt(),
        class_validator_1.Min(1)
    ], HistoryReqDTO.prototype, "page", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsInt(),
        class_validator_1.Min(1)
    ], HistoryReqDTO.prototype, "pageSize", void 0);
    return HistoryReqDTO;
}(coin_type_req_dto_1.CoinTypeReqDTO));
exports.HistoryReqDTO = HistoryReqDTO;
