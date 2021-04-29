import { Controller, Query, Get, Param } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getCustumers(@Query('limit') limit = 100, @Query('offset') offset: number) {
    return `Custumers: limit = ${limit} and offset = ${offset}. `;
  }
  // static route go first
  @Get('filter')
  getCustumerFilter() {
    return `my static filter`;
  }
  // dynamic routes after
  @Get(':id')
  getCustumer(@Param('id') id: string) {
    return `Custumer ${id}`;
  }
}
