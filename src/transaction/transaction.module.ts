import { Module } from '@nestjs/common';
import { TransactionController } from './controller/transaction.controller';
import { TransactionService } from './service/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { Request } from '../request/entity/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request, Transaction])],
  exports: [TypeOrmModule],
  providers : [TransactionService],
  controllers: [TransactionController]
})
export class TransactionModule {}
