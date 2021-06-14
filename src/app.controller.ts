import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
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
  @Get('tasks')
  @HttpCode(HttpStatus.OK)
  tasks() {
    return this.appService.getTasks();
  }
}
