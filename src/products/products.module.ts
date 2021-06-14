import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entitites/products.entity';

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from './entitites/brands.entity';

import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entitites/categories.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
