import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
const users = [
  { id: '1', name: 'Fernando Cordero', email: 'fcordero@acid.cl' },
  { id: '2', name: 'Dama Castillo', email: 'damarisc@gmail.com' },
];
@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('limit') limit = 100, @Query('offset') offset: number) {
    return {
      message: `Users limit: ${limit} and offset: ${offset}`,
      Body: users,
    };
  }

  @Get(':id')
  getUser(@Param('id') id: any) {
    const user = users.filter((item) => item.id == id);
    return {
      message: ``,
      user,
    };
  }

  @Post()
  createUser(@Body() body: any) {
    const { id, name, email } = body;
    const user = { id, name, email };

    users.push(user);
    return {
      message: `User created`,
      user,
    };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: `User delete with ID:${id}`,
    };
  }
}
