import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repository/product.repository';
import { InventoryRepository } from './repository/inventory.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, InventoryRepository]),
  ],
  providers: [
    ProductService,
  ],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule {}
