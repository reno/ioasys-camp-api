import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserId } from '@shared/decorators/user.decorator';
import { CreateOrderRequestDTO } from '@shared/dtos/order/createOrderRequest.dto';
import { Product } from '@shared/entities/product/product.entity';
import { User } from '@shared/entities/user/user.entity';
import { AdminGuard } from '@shared/guards/admin.guard';
import { instanceToInstance } from 'class-transformer';
import { OrderService } from './order.service';

ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findByUser(@UserId() user: User) {
    const orders = await this.orderService.findByUser(user);
    return orders.map(product => instanceToInstance(product));
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    const order = await this.orderService.findOne(id);
    return instanceToInstance(order);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Product })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async create(@UserId() user: User, @Body() createOrderRequestDTO: CreateOrderRequestDTO) {
    const order = await this.orderService.create(user, createOrderRequestDTO);
    return instanceToInstance(order);
  }
  
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: string) {
    const order = await this.orderService.remove(id);
    return instanceToInstance(order);
  }
}