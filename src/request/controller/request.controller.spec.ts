import { Test, TestingModule } from "@nestjs/testing";
import { RequestController } from "./request.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from '../entity/request.entity';
import { Rider } from '../../rider/entity/rider.entity';
import { Driver } from "../../driver/entity/driver.entity";
import { AppEntity } from '../../app.entity';
import { HttpModule } from '@nestjs/axios';
import { RequestService } from '../service/request.service';
import { AppService } from '../../app.service';
import { CreateRequest } from "../entity/create-request.dto";
import { RequestModule } from '../request.module';
import { ConfigModule } from "@nestjs/config";
import { Transaction } from "../../transaction/entity/transaction.entity";
import { TransactionModule } from '../../transaction/transaction.module';

describe("RequestController", () => {
  let requestController: RequestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RequestController],

      imports: [
        HttpModule, 
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

      TypeOrmModule.forFeature([Request, Rider, Driver, AppEntity]),
      
      TransactionModule,
      RequestModule,
      ],
      exports: [TypeOrmModule, RequestService],
      providers: [RequestService, AppService],
    }).compile();

    requestController = app.get<RequestController>(RequestController);
  });

  describe("request", () => {
    it("should return object with message Driver found", async () => {
      
      let body = new CreateRequest()

      body.rider_id = 1;
      body.latitude = 2.199011986909997;
      body.longitude = -75.63170384894909;

      let data = await requestController.create(body);

      expect(data).toMatchObject({ message : 'Driver found'});
    });
  });
});
