import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { PaymentModule } from '../payment/payment.module';
import { CartModule } from '../cart/cart.module';
import { OrderProductModule } from 'src/order-product/order-product.module';

@Module({
  imports: [PaymentModule, CartModule, OrderProductModule ,TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
