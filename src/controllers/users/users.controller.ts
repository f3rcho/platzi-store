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
import { UsersService } from '../../services/users/users.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from '../../dtos/users.dtos';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers(@Query('limit') limit = 100, @Query('offset') offset = 5) {
    const users = this.usersService.findAll();
    return {
      message: `Users limit: ${limit} and offset: ${offset}`,
      data: users,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id', ParseIntPipe) id: number) {
    return { data: this.usersService.findOne(id) };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() payload: CreateUserDto) {
    return {
      message: 'User Created',
      data: this.usersService.create(payload),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return {
      message: `User updated`,
      data: this.usersService.update(id, payload),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return { data: this.usersService.remove(id) };
  }
}
