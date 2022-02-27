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
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDTO } from '@shared/dtos/product/createProduct.dto';
import { UpdateProductDTO } from '@shared/dtos/product/updateProduct.dto';
import { Product } from '@shared/entities/product/product.entity';
import { AdminGuard } from '@shared/guards/admin.guard';
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
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Product })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async create(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.create(createProductDTO);
    return instanceToInstance(product);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(@Param('id') id: string, @Body() updateProductDTO: UpdateProductDTO,){
    const product = await this.productService.update(id, updateProductDTO);
    return instanceToInstance(product);
  }
  
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: string) {
    const product = await this.productService.remove(id);
    return instanceToInstance(product);
  }
}