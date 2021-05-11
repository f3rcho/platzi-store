import { IsString, IsOptional, IsPositive, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateCategoryDto {
  @IsString()
  readonly name: string;
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
