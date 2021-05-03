import { IsString, IsEmail, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsBoolean()
  readonly isAdmin: boolean;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
