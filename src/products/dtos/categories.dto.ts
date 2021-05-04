import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateCategoryDto {
  @IsString()
  readonly name: string;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
