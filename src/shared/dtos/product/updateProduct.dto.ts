import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDTO } from "@shared/dtos/product/createProduct.dto";

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}