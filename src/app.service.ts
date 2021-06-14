import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './config';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject('PG') private clientPG: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.api.apiKey;
    const dbName = this.configService.database.name;
    return `Hello World! my apiKey is :${apiKey} and my dbNam ${dbName}`;
  }
  getTasks() {
    this.logger.log('[getTasks]: request');
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          this.logger.error(`Error calling getTasks ${err}`);
          reject(err);
        }
        this.logger.log(`[getTasks] - response: ${JSON.stringify(res.rows)}  `);
        resolve(res.rows);
      });
    });
  }
}
