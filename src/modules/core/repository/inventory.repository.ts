import { EntityRepository, Repository } from 'typeorm';
import { ProductInventory } from '@shared/entities/product/inventory.entity';

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
}