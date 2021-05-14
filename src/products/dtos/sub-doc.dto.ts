import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateSubDocDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
export class UpdateSubDoc extends PartialType(CreateSubDocDto) {}
