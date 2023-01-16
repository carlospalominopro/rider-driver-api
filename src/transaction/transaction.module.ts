import { Module } from '@nestjs/common';
import { TransactionController } from './controller/transaction.controller';
import { TransactionService } from './service/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { RequestModule } from '../request/request.module';
import { CalculateService } from './service/calculate.service';
import { HttpModule } from '@nestjs/axios';
import { AppService } from '../app.service';
import { AppEntity } from '../app.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, AppEntity]), RequestModule, HttpModule],
  exports: [TypeOrmModule],
  providers : [TransactionService, CalculateService, AppService],
  controllers: [TransactionController]
})
export class TransactionModule {}
