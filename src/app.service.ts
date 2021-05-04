import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.api.apiKey;
    const dbName = this.configService.database.name;
    return `Hello World! my apiKey is :${apiKey} and my dbNam ${dbName}`;
  }
}
