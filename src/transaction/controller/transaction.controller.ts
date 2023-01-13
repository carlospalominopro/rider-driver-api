import { Controller, Post } from '@nestjs/common';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../entity/transaction.entity';

@Controller('transaction')
export class TransactionController {

    constructor(private readonly transactionService : TransactionService) {
    }

    @Post()
    store(): Promise<Transaction[]> {
        
        return this.transactionService.store();

    }

}
