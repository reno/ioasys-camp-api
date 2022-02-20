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
    let product = await this.productRepository.create(createProductDTO);
    return await this.productRepository.save(product);
  }
}