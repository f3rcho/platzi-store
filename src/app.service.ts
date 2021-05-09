import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import config from './config';
@Injectable()
export class AppService {
  constructor(
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.api.apiKey;
    const dbName = this.configService.database.name;
    return `Hello World! my apiKey is :${apiKey} and my dbNam ${dbName}`;
  }
  getTasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
