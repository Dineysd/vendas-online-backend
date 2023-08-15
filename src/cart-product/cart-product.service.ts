import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto } from '../cart/dto/create-cart.dto';
import { DeleteResult, Repository } from 'typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { ProductService } from '../product/product.service';
import { CartEntity } from '../cart/entities/cart.entity';
import { UpdateCartDto } from '../cart/dto/update-cart.dto';

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
        return this.createProductInCart(dto, cart.id);
    }

    return this.repo.save({
        ...cartProduct,
        amount: cartProduct.amount + dto.amount,
      });
  }

  async updateProductInCart(dto: UpdateCartDto, cart: CartEntity)
  : Promise<CartProductEntity> {
    await this.productService.findProductBy(dto.productId)

    const cartProduct = await this.verifyProductInCart(
        dto.productId, 
        cart.id
      );

    return this.repo.save({
        ...cartProduct,
        amount: dto.amount,
      })
  }

  async deleteProductInCart(productId: number, cartId: number)
  : Promise<DeleteResult> {
    return this.repo.delete({ productId, cartId });
  }
}
