import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentService } from '../payment/payment.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity) 
  private readonly repository: Repository<OrderEntity>,
  private readonly orderProductService: OrderProductService,
  private readonly paymentService: PaymentService,
  private readonly cartService: CartService ){}

  async create(createOrderDto: CreateOrderDto, cartId: number, userId: number) {
    
    const payment: PaymentEntity = await this.paymentService.createPayment(createOrderDto, null, null)

    const order = await this.repository.save({
      addressId: createOrderDto.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId
    });

    const cart = await this.cartService.findCartByUserId(userId, true)

    cart.cartProduct?.map((cartProduct) =>
        this.orderProductService.createOrderProduct(
          cartProduct.productId,
          order.id,
          0,
          cartProduct.amount,
        ),
      );
    
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
