import { EntityRepository, Repository } from 'typeorm';
import { Product } from '@shared/entities/product/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  async findById(id: string): Promise<Product | undefined> {
    return await this.findOne({
      where: { id },
      relations: ['inventories'],
    });
  }
}