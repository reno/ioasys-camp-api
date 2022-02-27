import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInventoryDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public size: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public quantity: number;

}

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @ApiProperty({type: CreateInventoryDTO, isArray: true})
  @ValidateNested()
  @Type(() => CreateInventoryDTO)
  public inventories: CreateInventoryDTO[];
}
