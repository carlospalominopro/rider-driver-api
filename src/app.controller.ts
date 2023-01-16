import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service'
import { AppEntity } from './app.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('get-token')
    getToken(): Promise<AppEntity> {
        
      return this.appService.getToken();

    }
}
