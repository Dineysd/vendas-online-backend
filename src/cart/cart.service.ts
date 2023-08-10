import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartProductService } from '../cart-product/cart-product.service';
const LINE_AFFECTED = 1;
@Injectable()
export class CartService {
  

  constructor(@InjectRepository(CartEntity)
  private readonly repository: Repository<CartEntity>,
  private readonly cartProductService: CartProductService){}

  async clearCart(userId:  number): Promise<DeleteResult>{
    const cart = await this.findCartByUserId(userId)

    await this.repository.save({
      ...cart,
      active: false
    })

    return{
      raw: [],
      affected: LINE_AFFECTED
    }
  }

  async findCartByUserId(
    userId: number,
    isRelations?: boolean,
  ): Promise<CartEntity> {
    const relations = isRelations
      ? {
          cartProduct: {
            product: true,
          },
        }
      : undefined;

    const cart = await this.repository.findOne({
      where: {
        userId,
        active: true,
      },
      relations,
    });

    if (!cart) {
      throw new NotFoundException(`Cart active not found`);
    }

    return cart;
  }
  createCart(userId: number) :Promise<CartEntity> {
    return this.repository.save({
      active: true,
      userId
    });
  }

  async insertProductInCart(createCartDto: CreateCartDto, userId: number)
   :Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return await this.createCart(userId);
    });

    await this.cartProductService.insertProductInCart(createCartDto, cart);

    return cart;
  }

  async deleteProductCart(
    productId: number,
    userId: number,
  ): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);

    return await this.cartProductService.deleteProductInCart(productId, cart.id);
  }

  async updateProductInCart(
    dto: UpdateCartDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.updateProductInCart(dto, cart);

    return cart;
  }
  
}
