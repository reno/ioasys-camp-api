import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}