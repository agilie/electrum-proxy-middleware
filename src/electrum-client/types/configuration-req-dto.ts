import {IsString, IsEnum, MinLength, MaxLength, IsNotEmpty, IsDefined} from 'class-validator';
import {ProtocolTypeEnum} from './protocol.type.enum';
import {NetmodeTypeEnum} from './netmode.type.enum';

export class ConfigurationReqDTO {
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @MinLength(0)
    @MaxLength(20)
    host: string;

    @IsNotEmpty()
    @IsDefined()
    port: number;

    @IsEnum(ProtocolTypeEnum)
    connectionType: ProtocolTypeEnum;

    @IsNotEmpty()
    @IsDefined()
    version: number;

    @IsEnum(NetmodeTypeEnum)
    netMode: NetmodeTypeEnum = NetmodeTypeEnum.MAINNET;
}
