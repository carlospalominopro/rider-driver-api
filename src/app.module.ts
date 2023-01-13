import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver/entity/driver.entity';
import { Rider } from './rider/entity/rider.entity';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/entity/transaction.entity';
import { Payment } from './payment/entity/payment.entity';
import { RequestModule } from './request/request.module';
import { Request } from './request/entity/request.entity';
import { HttpExceptionFilter } from './utils/http-exception.filter';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [
        Driver,
        Rider,
        Payment,
        Request,
        Transaction,
      ],
      synchronize: true,
    }),
    
    TransactionModule,
    RequestModule,

    RouterModule.register([
      {
        path: 'api',
        module: TransactionModule,
      },      
      {
        path: 'api',
        module: RequestModule,
      },      
    ]), 
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
