import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [PaymentModule ,TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
