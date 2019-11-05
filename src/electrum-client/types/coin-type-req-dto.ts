import {IsEnum} from 'class-validator';
import {CoinType} from '../../service/wallet/types/coin.type';
import {NetmodeTypeEnum} from './netmode.type.enum';

export class CoinTypeReqDTO {
    @IsEnum(CoinType)
    coinType: CoinType;

    @IsEnum(NetmodeTypeEnum)
    netMode: NetmodeTypeEnum = NetmodeTypeEnum.MAINNET;
}
