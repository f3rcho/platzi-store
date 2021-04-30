export class CreateProductDto {
  readonly sku: string;
  readonly name: string;
  readonly price: number;
}
export class UpdateProductDto {
  readonly sku?: string;
  readonly name?: string;
  readonly price?: number;
}
