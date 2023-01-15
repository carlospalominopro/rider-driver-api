import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from '../service/transaction.service';
import { CreateTransaction } from '../entity/create-transaction.dto';

@Controller('transaction')
export class TransactionController {

    constructor(
        private readonly transactionService : TransactionService

    ) {
    }

    @Post('create')
    create(@Body() data : CreateTransaction){
        return this.transactionService.create(data);

    }

}
