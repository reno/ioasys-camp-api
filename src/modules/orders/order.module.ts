import { InventoryRepository } from '@modules/core/repository/inventory.repository';
import { ProductRepository } from '@modules/core/repository/product.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItemRepository } from './repository/item.repository';
import { OrderRepository } from './repository/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderItemRepository,
      ProductRepository,
      InventoryRepository
    ]),
  ],
  providers: [
    OrderService,
  ],
  controllers: [OrderController],
  exports: [OrderService]
})
export class OrderModule {}
