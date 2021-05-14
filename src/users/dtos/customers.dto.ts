import {
  IsString,
  IsEmail,
  IsOptional,
  IsPositive,
  Min,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateCustomerDto {
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsArray()
  @IsNotEmpty()
  readonly skills: any;
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
