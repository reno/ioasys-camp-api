import { EntityRepository, Repository } from 'typeorm';
import { Product } from '@shared/entities/product/product.entity';
import { CreateInventoryDTO, CreateProductDTO } from '@shared/dtos/product/createProduct.dto';
import { ProductInventory } from '@shared/entities/product/inventory.entity';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(ProductInventory)
export class InventoryRepository extends Repository<ProductInventory> {

  async findByProductId(productId: string): Promise<ProductInventory[] | undefined> {
    return this.find({
      where: {
        product: productId
      },
      relations: ['product'],
    });
  }

  async createInventory(product: Product, createInventoryDTO: CreateInventoryDTO): Promise<ProductInventory> {
    const inventory = await this.save(createInventoryDTO);
    inventory.product = product;
    return this.save(inventory);
  }
}