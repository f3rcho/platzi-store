import { Controller, Get, Query, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('limit') limit = 100, @Query('offset') offset: number) {
    return `Users limit: ${limit} and offset: ${offset}`;
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return `User ${id}`;
  }
}
