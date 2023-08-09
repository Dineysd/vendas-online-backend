import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto } from '../cart/dto/create-cart.dto';
import { Repository } from 'typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { ProductService } from '../product/product.service';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Injectable()
export class CartProductService {
    constructor(@InjectRepository(CartProductEntity) 
  private readonly repo: Repository<CartProductEntity>,
  private readonly productService: ProductService){}

  async verifyProductInCart(productId: number, cartId: number): Promise<CartProductEntity>{
    const cartProduct = await this.repo.findOne({
        where:{
            productId,
            cartId
        }
    })

    if(!cartProduct){
        throw new NotFoundException('Product not found in cart');
    }

    return cartProduct

  }

  async createProductInCart(
    dto: CreateCartDto,
    cartId: number,
  ): Promise<CartProductEntity> {
    return this.repo.save({
      amount: dto.amount,
      productId: dto.productId,
      cartId,
    });
  }

  async insertProductInCart(dto: CreateCartDto, cart: CartEntity){
    await this.productService.findProductBy(dto.productId)

    const cartProduct = await this.verifyProductInCart(dto.productId, cart.id)
    .catch(()=> undefined);

    if(!cartProduct){
        throw this.createProductInCart(dto, cart.id);
    }

    return this.repo.save({
        ...cartProduct,
        amount: cartProduct.amount + dto.amount,
      });



  }
}
