import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDTO } from '@shared/dtos/product/createProduct.dto';
import { Product } from '@shared/entities/product/product.entity';
import { instanceToInstance } from 'class-transformer';
import { ProductService } from './product.service';

ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return products.map(product => instanceToInstance(product));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return instanceToInstance(product);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Product })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async create(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.create(createProductDTO);
    return instanceToInstance(product);
  }
}