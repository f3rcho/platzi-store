import { IsString, IsOptional, IsPositive, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateBrandDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly image: string;
}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
export class FilterBrandDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}
