import { IsString, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateCustomerDto {
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
}
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
