import { IsString, IsNumber, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @IsString()
  @ApiProperty({ description: 'products SKU ' })
  readonly sku: string;

  @IsString()
  @ApiProperty({ description: 'products Name ' })
  readonly name: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'porducts Price ' })
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'products stock' })
  readonly stock: number;

  @IsString()
  @ApiProperty({ description: 'products image url ' })
  readonly url: string;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
