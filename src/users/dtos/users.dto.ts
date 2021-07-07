import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsBoolean()
  @ApiProperty()
  readonly isAdmin: boolean;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly customerId: number;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
