import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_inventories')
export class ProductInventory {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  public size: string;

  @ApiProperty()
  @Column({ type: 'int', nullable: false })
  public quantity: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}