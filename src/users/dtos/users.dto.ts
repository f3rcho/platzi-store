import { IsString, IsEmail, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsBoolean()
  readonly isAdmin: boolean;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
