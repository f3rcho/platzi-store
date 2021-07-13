import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly customerId: number;
}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
