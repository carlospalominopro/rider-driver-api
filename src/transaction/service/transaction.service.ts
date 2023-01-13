import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entity/transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>
      ) {}
    
      store(): Promise<Transaction[]> {
        return this.transactionRepository.find();
      }
}
