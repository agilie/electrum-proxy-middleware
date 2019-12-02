"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var protocol_type_enum_1 = require("./protocol.type.enum");
var ConfigurationReqDTO = /** @class */ (function () {
    function ConfigurationReqDTO() {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(0),
        class_validator_1.MaxLength(20)
    ], ConfigurationReqDTO.prototype, "host", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsDefined()
    ], ConfigurationReqDTO.prototype, "port", void 0);
    __decorate([
        class_validator_1.IsEnum(protocol_type_enum_1.ProtocolTypeEnum)
    ], ConfigurationReqDTO.prototype, "connectionType", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsDefined()
    ], ConfigurationReqDTO.prototype, "version", void 0);
    return ConfigurationReqDTO;
}());
exports.ConfigurationReqDTO = ConfigurationReqDTO;
