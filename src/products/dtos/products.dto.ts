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
import { CreateSubDocDto } from './sub-doc.dto';
import { Type } from 'class-transformer';
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
  // relations typed one to one
  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly subDoc: CreateSubDocDto;
  // relations typed one to n
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[];
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
