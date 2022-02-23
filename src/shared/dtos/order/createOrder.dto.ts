import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@shared/entities/product/product.entity';
import { Type } from 'class-transformer';

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';


export class CreateOrderItemDTO {
  @ApiProperty()
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

  @ApiProperty()
  @IsNumber()
  public price: number;
}

export class CreateOrderDTO {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateOrderItemDTO)
  public items: CreateOrderItemDTO[];

  @ApiProperty()
  @IsNumber()
  public totalPrice: number;
}