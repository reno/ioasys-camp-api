import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './repository/product.repository';
import { InventoryRepository } from './repository/inventory.repository';
import { Product } from '@shared/entities/product/product.entity';
import { CreateProductDTO } from '@shared/dtos/product/createProduct.dto';
import { PG_DUPLICATED_ERROR } from '@shared/constants/errors';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    @InjectRepository(InventoryRepository)
    private readonly productRepository: ProductRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findById(id);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async create(createProductDTO: CreateProductDTO): Promise<Product> {
    try {
      let product = await this.productRepository.create(createProductDTO);
      return await this.productRepository.save(product);
    } catch (error) {
      if (error.code === PG_DUPLICATED_ERROR) {
        throw new ConflictException('Product name already exists');
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<Product> {
    const product: Product = await this.productRepository.findById(id);
    if (!product) {
      throw new HttpException("Product doesn't exist", HttpStatus.BAD_REQUEST);
    }
    await this.productRepository.softDelete({ id });
    return product;
  }
}