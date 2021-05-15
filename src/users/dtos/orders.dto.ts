import {
  IsMongoId,
  IsNotEmpty,
  IsDate,
  IsArray,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsArray()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class FilterOrderDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}

export class AddProductToOrderDto {
  @IsArray()
  readonly productsId: string[];
}
