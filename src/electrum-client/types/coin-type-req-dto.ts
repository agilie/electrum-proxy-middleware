import {IsEnum, IsOptional} from 'class-validator';
import {CoinType} from '../../service/wallet/types/coin.type';
import {Netmode} from './netmode';

export class CoinTypeReqDTO {
    @IsEnum(CoinType)
    coinType: CoinType;

    @IsOptional()
    @IsEnum(Netmode)
    netMode: Netmode = Netmode.MAINNET;
}
