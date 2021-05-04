import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}
  getHello(): string {
    const apiKey = this.config.get<string>('API_KEY');
    const dbName = this.config.get<string>('DATABASE_NAME');
    return `Hello World! my apiKey is :${apiKey} and my dbNam ${dbName}`;
  }
}
