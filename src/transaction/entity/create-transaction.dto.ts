import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransaction {
    @IsNumber() @IsNotEmpty()
    idRequest: number;

    @IsNumber() @IsNotEmpty()
    latitude_end: number;

    @IsNumber() @IsNotEmpty()
    longitude_end: number;
}