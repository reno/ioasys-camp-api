import { PartialType } from '@nestjs/swagger'
import { CreateProductDTO } from '@shared/dtos/product/createProduct.dto';

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}