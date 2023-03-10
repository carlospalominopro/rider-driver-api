import { Controller, Post, Body } from '@nestjs/common';
import { RequestService } from '../service/request.service';
import { CreateRequest } from '../entity/create-request.dto';

@Controller('request')
export class RequestController {

    constructor(private readonly requestService : RequestService) {
    }

    @Post('create')
    create(@Body() data: CreateRequest){
        
        return this.requestService.store(data);

    }

}
