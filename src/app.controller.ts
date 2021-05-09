import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('new')
  getNew(): string {
    return 'New route';
  }
  @Get('/tasks/')
  getTasks() {
    return this.appService.getTasks();
  }
}
