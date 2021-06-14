import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Client } from 'pg';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import { enviroments } from './environments';
import { DatabaseModule } from './database/database.module';
import config from './config';

const API_KEY = '123EXAMPLE';
const API_KEY_PROD = '345example';

// programatic client connection pg
const configPg = {
  database: 'my_db',
  port: 5432,
  host: 'localhost',
  password: '123456',
  user: 'root',
};

const client = new Client(configPg);
client.connect((err) => {
  if (err) {
    console.error(err.stack, 'ERROR');
  } else {
    console.log('Connected');
  }
});

client.query('SELECT * FROM tasks', (err, res) => {
  try {
    console.log(res.rows);
  } catch (error) {
    console.error(err);
    client.end();
  }
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
})
export class AppModule {}
