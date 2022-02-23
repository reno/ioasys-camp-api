import { EntityRepository, Repository } from 'typeorm';
import { Order } from '@shared/entities/order/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {

  async findById(id: string): Promise<Order | undefined> {
    return await this.findOne({
      where: { id },
      relations: ['items'],
    });
  }
}