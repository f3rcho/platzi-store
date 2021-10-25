import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(): string {
    this.logger.log(`Testing logger in getHello`);
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
