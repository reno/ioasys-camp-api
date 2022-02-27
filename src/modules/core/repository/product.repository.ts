import { EntityRepository, Repository } from 'typeorm';
import { Product } from '@shared/entities/product/product.entity';
import { UpdateProductDTO } from '@shared/dtos/product/updateProduct.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  async findById(id: string): Promise<Product | undefined> {
    return await this.findOne({
      where: { id },
      relations: ['inventories'],
    });
  }
}