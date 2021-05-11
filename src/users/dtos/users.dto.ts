import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsBoolean()
  readonly isAdmin: boolean;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class FilterUserDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}
