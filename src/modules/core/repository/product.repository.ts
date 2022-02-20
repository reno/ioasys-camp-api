import { EntityRepository, Repository } from 'typeorm';
import { Product } from '@shared/entities/product/product.entity';
import { CreateProductDTO } from '@shared/dtos/product/createProduct.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  async findById(id: string): Promise<Product | undefined> {
    return await this.findOne(id);
  }

}