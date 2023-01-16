import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppEntity } from './app.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(AppEntity)
        private appRepository: Repository<AppEntity>
  ) {
    
  }
  
  getHello(): string {
    return 'Hello World!';
  }

  async getToken(): Promise<AppEntity> {

    const url = `${process.env.API_URL}/merchants/${process.env.PUB_TEST}`;

    const request = await this.httpService.axiosRef.get(url);

    const { presigned_acceptance } = request.data?.data;

    const tokenData = new AppEntity();
    tokenData.acceptance_token = presigned_acceptance?.acceptance_token;

    return this.appRepository.save(tokenData);    

  }

  async getLastAcceptanceToken(): Promise<AppEntity> {

    return this.appRepository
      .createQueryBuilder("app_entity")
      .select()
      .orderBy({ id: 'DESC' })
      .getOne();   

  }
  
  async checkToken(): Promise<number> {

    return this.appRepository.count();   

  }

}
