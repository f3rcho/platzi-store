import { IsString, IsNumber, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateProductDto {
  @IsString()
  readonly sku: string;
  readonly name: string;
  readonly url: string;
  @IsNumber()
  @IsPositive()
  readonly price: number;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
