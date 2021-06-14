import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';

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
    console.log('Database connected');
  }
});
@Global()
@Module({
  providers: [
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['PG'],
})
export class DatabaseModule {}
