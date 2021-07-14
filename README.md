## Create a new project

```bash
$ nest new platzi-store
```

## Create a controller

```bash
$ nest g controller products
```

## Create a Service

```bash
$ nest g s services/products
```

## Create a Pipe

```bash
$ nest g pipe services/products
```

## useFactory

### Used to connect to a database

### HttpService as axios, it is implemented in background

// src/app.module.ts

```js
import { Module, HttpModule, HttpService } from '@nestjs/common';  // 👈 imports

@Module({
  imports: [HttpModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [
    imports: [HttpModule, UsersModule, ProductsModule], // 👈 add HttpModule
    ...,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => { // 👈 implement useFactory
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
```

```js
// src/app.service.ts

import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[], // 👈 inject TASKS
  ) {}
  getHello(): string {
    console.log(this.tasks); // 👈 print TASKS
    return `Hello World! ${this.apiKey}`;
  }
}
```

## Global module

### We can create a global module, and have global env, and also services in order to avoid cirluar dependecies

```js
// src/database/database.module.ts

import { Module, Global } from '@nestjs/common';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
```

```js
// src/app.module.ts
...
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule // 👈 Use DatabaseModule like global Module
   ],
  ...
})
export class AppModule {}
```

```js
// src/users/services/users.service.ts

import { Injectable, NotFoundException, Inject } from '@nestjs/common';
..

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject('API_KEY') private apiKey: string, // 👈 Inject API_KEY
  ) {}

}
```

## Config Module

### Start installing

```bash
$ npm i @nestjs/config
```

## config by environments

- Create 2 files and fill them with the info .stag.env and .prod.env
- create a new file src/environments.ts

```js
export const enviroments = {
  dev: '.env',
  stag: '.stag.env',
  prod: '.prod.env',
};
```

- Them, modify the AppModule

```js
// src/app.module.ts
...

import { enviroments } from './enviroments'; // 👈

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', // 👈
      isGlobal: true,
    }),
    ...
  ],
  ...
})
export class AppModule {}
```

## .env validations schemas with Joi

```bash
$ npm i joi
```

```js
// src/app.module.ts

import * as Joi from 'joi';  // 👈

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({ // 👈
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    ...
  ],
  ...
})
export class AppModule {}
```

## Integrating Swagger and PartialType with Open API

### install

```bash
$ npm install --save @nestjs/swagger swagger-ui-express
```

```js
// src/main.ts

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  ...
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('PLATZI STORE')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  ...
  await app.listen(3000);
}
bootstrap();
```

Add plugin compilerOptions

```js
# nest-cli.json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": ["@nestjs/swagger/plugin"]
  }
}
```

Replace PartialType on DTOs with swagger

```js
// src/products/dtos/brand.dtos.ts
import { PartialType } from '@nestjs/swagger';
```

## Extend docs

Using same @nest/swagger, import ApiProperty in order to use in DTOs and ApiOperation to add a summary in each route of your controllers

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

## Docker and postgres

Once you create your docker-compose file, exec the command to run the postgres image detach:

```bash
docker-compose up -d postgres
```

Check if it was created

```bash
docker-compose ps
```

Watch logs

```bash
docker-compose logs -f postgres
```

### Working with postgres

To access to database we need to exec a bash inside dockker container

```bash
docker-compose exec postgres bash
```

Once we get into the terminal, we need to access to database

```bash
psql -h localhost -d my_db -U root
```

Now we are into postgres.

Check our database

```bash
\d+
```

And

```bash
\q
```

to quit

### Using pgadmin

Here we configured pgadmin in our docker-compose

```yaml
pgadmin:
  image: dpage/pgadmin4
  environment:
    - PGADMIN_DEFAULT_EMAIL=fcordero@acid.cl
    - PGADMIN_DEFAULT_PASSWORD=root
  ports:
    - '5050:80'
```

Once we run docker-compose up -d, we could access to localhost:5050 and configured our db server.
We need to extract the ip address from our docker container running docker inspect.

To work with postgres, we need to install

```bash
npm i pg
```

And

```bash
npm @types/pg -D
```

### TypeORM pattern

- Active record
  Use the same instance. Use the model

- Repository (Recommended, scalable)
  Divided responsabilities and then
  create new instance

### TypeORM with mysql

- A new branch was created with the implementation with mysql and phpmyadmin called typeorm_mysql

### Migrations

To generate migrations add the command in the package.json

```json
"migrations:generate": "npm run typeorm -- migration:generate -n"
```

Run migrations with:

```json
    "migrations:run": "npm run typeorm -- migration:run",
```

Dont forget to use the option "synchronize: false" in order to run de migrations

and also, you can add:

```json
    "migrations:show": "npm run typeorm -- migration:show",
    "migrations:drop": "npm run typeorm -- migration:drop",
    "migrations:revert": "npm run typeorm -- migration:revert",
```

### Indexes

we can add a index to group or individualy by using decorator @Index from typeORM

```js
@Entity()
// group
@Index(['price', 'stock'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  // or individualy
  @Index()
  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;
```

And then generate and run migrations
