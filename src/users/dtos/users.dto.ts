import { IsString, IsEmail, IsBoolean } from 'class-validator';
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
