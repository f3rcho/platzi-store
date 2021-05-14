import {
  IsString,
  IsEmail,
  IsOptional,
  IsPositive,
  Min,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateSkillDto } from './skills.dto';
export class CreateCustomerDto {
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  readonly skills: CreateSkillDto[];
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
