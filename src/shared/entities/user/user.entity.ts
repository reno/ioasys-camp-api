import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from 'typeorm';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';


export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false, unique: true  })
  public username: string;

  @Column({ type: 'varchar', nullable: false})
  @Exclude()
  public password: string;

  @ApiProperty()
  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  public firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name', type: 'varchar', nullable: false })
  public lastName: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false, unique: true  })
  public email: string;
  
  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  public address: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  public phone: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  public role: UserRole;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const encryption = new BcryptProvider();
    this.password = await encryption.createHash(this.password);
  }
}
