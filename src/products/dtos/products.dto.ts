import {
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsNotEmpty,
  IsMongoId,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './categories.dto';
export class CreateProductDto {
  @IsString()
  @ApiProperty({ description: 'products SKU ' })
  readonly sku: string;
  @IsString()
  @ApiProperty({ description: 'products Name ' })
  readonly name: string;
  @IsString()
  @ApiProperty({ description: 'products image url ' })
  readonly url: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'products Price ' })
  readonly price: number;
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'products stock ' })
  readonly stock: number;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly category: CreateCategoryDto;

  @IsMongoId()
  @IsNotEmpty()
  readonly brand: string;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
