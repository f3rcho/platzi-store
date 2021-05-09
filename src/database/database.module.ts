import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';

import config from '../config';
@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {
          connection,
          user,
          password,
          host,
          port,
          dbname,
        } = configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbname);
        return database;
      },
      inject: [config.KEY],
    },
    // {
    //   provide: 'API_KEY',
    //   useValue:
    //     process.env.NODE_ENV === 'prod'
    //       ? process.env.API_KEY_PROD
    //       : process.env.API_KEY,
    // },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
