import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './repository/order.repository';
import { OrderItemRepository } from './repository/item.repository';
import { Order } from '@shared/entities/order/order.entity';
import { CreateOrderRequestDTO } from '@shared/dtos/order/createOrderRequest.dto';
import { User } from '@shared/entities/user/user.entity';
import { InventoryRepository } from '@modules/core/repository/inventory.repository';
import { ProductInventory } from '@shared/entities/product/inventory.entity';
import { ProductRepository } from '@modules/core/repository/product.repository';
import { CreateOrderDTO } from '@shared/dtos/order/createOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    @InjectRepository(OrderItemRepository)
    @InjectRepository(ProductRepository)
    @InjectRepository(InventoryRepository)
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly productRepository: ProductRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async findOne(id: string): Promise<Order> {
    return await this.orderRepository.findById(id);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findByUser(user: User): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { user }
    });
  }

  async create(user: User, createOrderRequestDTO: CreateOrderRequestDTO): Promise<Order> {
    await this._updateInventory(createOrderRequestDTO);
    const createOrderDTO = await this._updatePrice(createOrderRequestDTO);
    const data = {
      user,
      ...createOrderDTO,
    }
    let order = this.orderRepository.create(data);
    return await this.orderRepository.save(order);
  }

  async remove(id: string): Promise<Order> {
    const order: Order = await this.orderRepository.findById(id);
    if (!order) {
      throw new HttpException("Order doesn't exist", HttpStatus.BAD_REQUEST);
    }
    await this.orderRepository.softDelete({ id });
    return order;
  }

  private async _updateInventory(createOrderRequestDTO: CreateOrderRequestDTO): Promise<void> {
    for (let orderItem of createOrderRequestDTO.items) {
      let productInventory = await this.inventoryRepository.findOne({
        where: {
          product: orderItem.product,
          size: orderItem.size,
        }
      });
      if (productInventory.quantity >= orderItem.quantity) {
        productInventory.quantity -= orderItem.quantity;
        this.inventoryRepository.save(productInventory);
      } else {
        throw new HttpException(`Product ${orderItem.product} unavailable.`, HttpStatus.BAD_REQUEST);
      }
    }
  }

  private async _updatePrice(createOrderRequestDTO: CreateOrderRequestDTO): Promise<CreateOrderDTO> {
    let createOrderDTO: CreateOrderDTO = {
      items: [],
      totalPrice: 0.00,
    };
    for (let orderItem of createOrderRequestDTO.items) {
      let product = await this.productRepository.findById(`${orderItem.product}`);
      createOrderDTO.items.push({ ...orderItem, price: Number(product.price)});
      createOrderDTO.totalPrice += product.price * orderItem.quantity;
    }
    return createOrderDTO;
  }
}