import {Min, IsInt, IsOptional} from 'class-validator';
import {CoinTypeReqDTO} from './coin-type-req-dto';

export class HistoryReqDTO extends CoinTypeReqDTO {
    @IsOptional()
    @IsInt()
    @Min(0)
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Min(0)
    pageSize: number = 10;
}
