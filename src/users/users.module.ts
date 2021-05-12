import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';

import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from 'src/products/products.module';

import { Order, OrderSchema } from './entities/orders.entity';
import { User, UserSchema } from './entities/users.entity';
import { Customer, CustomerSchema } from './entities/customers.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, CustomersService, OrdersService],
})
export class UsersModule {}
