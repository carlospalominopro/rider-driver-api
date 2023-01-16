import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppEntity } from './app.entity';
import { ConfigModule } from '@nestjs/config';
import { Driver } from "./driver/entity/driver.entity";
import { Rider } from './rider/entity/rider.entity';
import { Transaction } from './transaction/entity/transaction.entity';
import { TransactionModule } from './transaction/transaction.module';
import { RequestModule } from './request/request.module';
import { Request } from './request/entity/request.entity';

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, 
        ConfigModule.forRoot(),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [
        AppEntity,
        Driver,
        Rider,
        Request,
        Transaction,
      ],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([AppEntity]),
    
    TransactionModule,
    RequestModule,
    ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe("Hello World!");
    });
    it('should return object with acceptance_token property', async() => {
        let data = await appController.getToken();
        expect(data).toHaveProperty('acceptance_token');
    });
  });
});
