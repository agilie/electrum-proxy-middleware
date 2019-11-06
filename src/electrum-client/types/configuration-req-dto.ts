import {IsString, IsEnum, MinLength, MaxLength, IsNotEmpty, IsDefined, IsOptional} from 'class-validator';
import {ProtocolTypeEnum} from './protocol.type.enum';
import {Netmode} from './netmode';

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

    @IsOptional()
    @IsEnum(Netmode)
    netMode: Netmode = Netmode.MAINNET;
}
