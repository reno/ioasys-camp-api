import { EntityRepository, Repository } from 'typeorm';
import { OrderItem } from '@shared/entities/order/item.entity';

@EntityRepository(OrderItem)
export class OrderItemRepository extends Repository<OrderItem> {

  async findByOrderId(orderId: string): Promise<OrderItem[] | undefined> {
    return this.find({
      where: {
        order: orderId
      },
      relations: ['order'],
    });
  }
}