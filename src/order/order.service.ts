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
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { OrderProductEntity } from '../order-product/entities/order-product.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity) 
  private readonly repository: Repository<OrderEntity>,
  private readonly orderProductService: OrderProductService,
  private readonly paymentService: PaymentService,
  private readonly cartService: CartService, 
  private readonly productService: ProductService){}

  async createOrderProductUsingCart(
    cart: CartEntity,
    orderId: number,
    products: ProductEntity[],
  ): Promise<OrderProductEntity[]> {
    return Promise.all(
      cart.cartProduct?.map((cartProduct) =>
        this.orderProductService.createOrderProduct(
          cartProduct.productId,
          orderId,
          products.find((product) => product.id === cartProduct.productId)
            ?.price || 0,
          cartProduct.amount,
        ),
      ),
    );
  }

  async create(createOrderDto: CreateOrderDto, userId: number) {

    const cart = await this.cartService.findCartByUserId(userId, true);
    const products = await this.productService.findAll(
      cart.cartProduct?.map((cartProduct) => cartProduct.productId),
    );
    
    const payment: PaymentEntity = await this.paymentService.createPayment(
      createOrderDto,
      products,
      cart,
    );

    const order = await this.saveOrder(createOrderDto, userId, payment);

    await this.createOrderProductUsingCart(cart, order.id, products);

    await this.cartService.clearCart(userId);
    
    return order;
  }

  async saveOrder(
    createOrderDTO: CreateOrderDto,
    userId: number,
    payment: PaymentEntity,
  ): Promise<OrderEntity> {
    return this.repository.save({
      addressId: createOrderDTO.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });
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
