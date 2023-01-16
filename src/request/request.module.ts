import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './service/request.service';
import { RequestController } from './controller/request.controller';
import { Request } from './entity/request.entity';
import { Rider } from '../rider/entity/rider.entity';
import { Driver } from '../driver/entity/driver.entity';
import { AppService } from '../app.service';
import { AppEntity } from '../app.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Request, Rider, Driver, AppEntity]), HttpModule],
  exports: [TypeOrmModule, RequestService],
  providers : [RequestService, AppService],
  controllers: [RequestController]
})
export class RequestModule {}
