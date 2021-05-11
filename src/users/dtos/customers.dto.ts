import {
  IsString,
  IsEmail,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateCustomerDto {
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
}
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
export class FilterCustomerDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}
