import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from '../../../src/shared/entities/user/user.entity';
import { UserRole } from "../../../src/shared/entities/user/user.entity";
import { Product } from '../../../src/shared/entities/product/product.entity';
import { ProductInventory } from "../../../src/shared/entities/product/inventory.entity";
import { Order } from '../../../src/shared/entities/order/order.entity';
import { OrderItem } from "../../../src/shared/entities/order/item.entity";

export class Seed1645809150728 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        username: 'reno',
        password: 'Camp@123',
        firstName: 'Renan',
        lastName: 'Modenese',
        email: 'renan.modenese@gmail.com',
        address: 'Rua Dr. Backer, 115A - Centro - Lavras/MG',
        phone: '35 98867-5310',
        role: UserRole.USER,
      })
    );
    const admin = await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        username: 'admin',
        password: 'Camp@123',
        firstName: 'Admin',
        lastName: 'Silva',
        email: 'admin@email.com',
        address: 'R. Chagas Dória, 310 - Centro - Lavras/MG',
        phone: '31 4141-5148',
        role: UserRole.ADMIN,
      })
    );
    const product = await queryRunner.manager.save(
      queryRunner.manager.create<Product>(Product, {
        name: 'Camiseta ioasys',
        description: 'Camiseta promocional da ioasys',
        price: 39.90,
      })
    );
    const inventory = await queryRunner.manager.save(
      queryRunner.manager.create<ProductInventory>(ProductInventory, {
        product: product,
        size: 'P',
        quantity: 30
      })
    );
    const secondInventory = await queryRunner.manager.save(
      queryRunner.manager.create<ProductInventory>(ProductInventory, {
        product: product,
        size: 'M',
        quantity: 50
      })
    );
    const otherProduct = await queryRunner.manager.save(
      queryRunner.manager.create<Product>(Product, {
        name: 'Boné ioasys',
        description: 'Boné promocional da ioasys',
        price: 29.90,
      })
    );
    const OtherInventory = await queryRunner.manager.save(
      queryRunner.manager.create<ProductInventory>(ProductInventory, {
        product: product,
        size: 'Unico',
        quantity: 30
      })
    );
    const order = await queryRunner.manager.save(
      queryRunner.manager.create<Order>(Order, {
        user: user,
        totalPrice: 39.90,
      })
    );
    const orderItem = await queryRunner.manager.save(
      queryRunner.manager.create<OrderItem>(OrderItem, {
        order: order,
        product: product,
        quantity: 1,
        price: 39.90,
        size: 'M',
      })
    );
    const otherOrder = await queryRunner.manager.save(
      queryRunner.manager.create<Order>(Order, {
        user: user,
        totalPrice: 29.90,
      })
    );
    const otherOrderItem = await queryRunner.manager.save(
      queryRunner.manager.create<OrderItem>(OrderItem, {
        order: otherOrder,
        product: otherProduct,
        quantity: 1,
        price: 29.90,
        size: 'Unico',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE * FROM order_items');
    await queryRunner.query('DELETE * FROM orders');
    await queryRunner.query('DELETE * FROM product_inventories');
    await queryRunner.query('DELETE * FROM products');
    await queryRunner.query('DELETE * FROM users');
  }
}
