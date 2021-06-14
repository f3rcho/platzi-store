import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'src/config/config';

@Global()
@Module({
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, dbName, password, port, host } = configService.postgres;
        const client = new Client({
          database: dbName,
          port,
          host,
          password,
          user,
        });
        client.connect((err) => {
          if (err) {
            console.error(err.stack, 'ERROR');
          } else {
            console.log('Database connected');
          }
        });
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG'],
})
export class DatabaseModule {}
