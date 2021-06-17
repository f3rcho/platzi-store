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
  Logger,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  logger = new Logger('UsersController');
  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers(@Query('limit') limit = 100, @Query('offset') offset = 5) {
    this.logger.log(`[getUsers]: Resquest`);
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`[getUserById]: Resquest`);
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  createUser(@Body() payload: CreateUserDto) {
    this.logger.log(
      `[createUser]: Resquest with payload:${JSON.stringify(payload)}`,
    );
    return this.usersService.create(payload);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    this.logger.log(
      `[updateUser]: Resquest id:${id} and payload:${JSON.stringify(payload)}`,
    );
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'User removed' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`[deleteUserById]: Resquest id:${id} `);
    this.usersService.remove(id);
    return {
      message: `User with id:${id} deleted`,
    };
  }
  // orders
  // @Get(':id/orders')
  // @HttpCode(HttpStatus.OK)
  // getOrder(@Param('id', ParseIntPipe) id: number) {
  //   return { data: this.usersService.getOrderByUser(id) };
  // }
}
