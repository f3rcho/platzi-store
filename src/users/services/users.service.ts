import { Injectable, NotFoundException, Logger, Inject } from '@nestjs/common';
import { Client } from 'pg';
import { User } from '../entities/users.entity';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private configService: ConfigService,
    @Inject('PG') private clientPG: Client,
  ) {}
  private counterId = 2;
  private users: User[] = [
    {
      id: 1,
      name: 'Fernando Cordero',
      email: 'fcordero@example.com',
      isAdmin: true,
    },
    {
      id: 2,
      name: 'Dama Castillo',
      email: 'damarisc@gmail.com',
      isAdmin: false,
    },
  ];

  findAll() {
    const dbName = this.configService.get('DATABASE_NAME');
    this.logger.log(`'findAll': ${dbName}`);
    console.log(dbName);

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return user;
  }
  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };
    return this.users[index];
  }
  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`users with id:${id} not found`);
    }
    this.users.splice(index, 1);
    return `User with id:${id} removed`;
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

  // getOrderByUser(id: number): Order {
  //   const user = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     products: this.productsService.findAll(),
  //   };
  // }
}
