import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { MongoidPipe } from '../../common/mongoid.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { FilterUserDto } from 'src/users/dtos/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers(@Query() params: FilterUserDto) {
    const users = this.usersService.findAll(params);
    return users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id', MongoidPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', MongoidPipe) id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', MongoidPipe) id: string) {
    return this.usersService.remove(id);
  }
  // orders
  @Get(':id/orders')
  @HttpCode(HttpStatus.OK)
  getOrder(@Param('id', MongoidPipe) id: string) {
    return { data: this.usersService.getOrderByUser(id) };
  }
}
