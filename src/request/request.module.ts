import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './service/request.service';
import { RequestController } from './controller/request.controller';
import { Request } from './entity/request.entity';
import { Rider } from '../rider/entity/rider.entity';
import { Driver } from '../driver/entity/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request, Rider, Driver])],
  exports: [TypeOrmModule],
  providers : [RequestService],
  controllers: [RequestController]
})
export class RequestModule {}
