import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductInventory } from './inventory.entity';

@Entity('products')
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false, unique: true })
  public name: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  public description: string;

  @ApiProperty()
  @Column({ type: 'decimal', nullable: false })
  public price: number;

  @ApiProperty()
  @OneToMany(() => ProductInventory, (inventory) => inventory.product, {
    eager: true,
    cascade: ['insert', 'update', 'soft-remove'],
    onDelete: 'CASCADE',
  })
  inventories: ProductInventory[];

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