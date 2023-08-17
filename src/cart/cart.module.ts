import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartProductModule } from '../cart-product/cart-product.module';

@Module({
  imports: [CartProductModule, TypeOrmModule.forFeature([CartEntity])],
  controllers: [CartController],
  providers: [CartService], exports: [CartService]
})
export class CartModule {}
