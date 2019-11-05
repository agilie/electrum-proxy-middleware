import {IsEnum} from 'class-validator';
import {CoinType} from '../../service/wallet/types/coin.type';

export class CoinTypeReqDTO {
    @IsEnum(CoinType)
    coinType: CoinType;

    netMode: string;
}
