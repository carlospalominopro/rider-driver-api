import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class CreateRequest {
    @IsNumber() @IsNotEmpty()
    rider_id: number;

    @IsNumber() @IsNotEmpty()
    latitude: number;

    @IsNumber() @IsNotEmpty()
    longitude: number;
}