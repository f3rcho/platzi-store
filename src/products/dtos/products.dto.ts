import { IsString, IsNumber, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateProductDto {
  @IsString()
  readonly sku: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly url: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
