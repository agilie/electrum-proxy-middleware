import {IsDefined, IsEnum, IsInt} from 'class-validator';
import {NetmodeTypeEnum} from './netmode.type.enum';
import {CoinType} from '../../service/wallet/types/coin.type';

export class HistoryReqDTO {

    @IsEnum(CoinType)
    @IsDefined()
    coinType: CoinType;

    @IsEnum(NetmodeTypeEnum)
    netMode: NetmodeTypeEnum = NetmodeTypeEnum.MAINNET;


    page: number = 1;
    pageSize: number = 10;
}
