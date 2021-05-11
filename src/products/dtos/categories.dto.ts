import {
  IsOptional,
  IsPositive,
  Min,
  IsUrl,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
export class FilterCategoryDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}
