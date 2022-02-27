import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@shared/entities/product/product.entity';
import { Type } from 'class-transformer';

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';


export class CreateOrderItemRequestDTO {
  @ApiProperty({
    description: 'product id',
    type: 'string',
    format: 'uuid'
  })
  @IsNotEmpty()
  public product: Product;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public quantity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public size: string;
}

export class CreateOrderRequestDTO {
  @ApiProperty({type: CreateOrderItemRequestDTO, isArray: true})
  @ValidateNested()
  @Type(() => CreateOrderItemRequestDTO)
  public items: CreateOrderItemRequestDTO[];
}