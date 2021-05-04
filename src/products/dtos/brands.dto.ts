import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateBrandDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly image: string;
}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
