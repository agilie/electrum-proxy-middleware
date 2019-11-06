import {Min, IsInt, IsOptional} from 'class-validator';
import {CoinTypeReqDTO} from './coin-type-req-dto';
import {Type} from 'class-transformer';
import 'reflect-metadata';

export class HistoryReqDTO extends CoinTypeReqDTO {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly pageSize: number = 10;
}
