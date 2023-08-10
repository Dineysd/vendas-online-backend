import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enums/user-type.enum';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CartEntity } from './entities/cart.entity';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnCartDTO } from './dto/return-cat.dto';
@ApiTags('Shopping Cart')
@Roles(UserType.User, UserType.Admin)
@Controller('cart')
@ApiBearerAuth()
@Roles(UserType.Admin)  
export class CartController {
  constructor(private readonly cartService: CartService) {}

  
  @UsePipes(ValidationPipe)
  @Post()
  @ApiBody({ type: CreateCartDto })
  @ApiCreatedResponse({
      description: 'Cart of user Created Successfully!',
      type: CartEntity,
  })
  @ApiUnauthorizedResponse({ description: 'Not authorized!' })
  async create(@Body() createCartDto: CreateCartDto, @UserId() userId: number): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(await this.cartService.insertProductInCart(createCartDto, userId));
  }

  @Get()
  async findCartByUSerId(@UserId() id: number)
  :Promise<ReturnCartDTO> {
    return new ReturnCartDTO(await this.cartService.findCartByUserId(id, true));
  }
  @UsePipes(ValidationPipe)
  @Patch()
  @ApiUnauthorizedResponse({ description: 'Not authorized!' })
  async update(@UserId()userId: number, @Body() updateCartDto: UpdateCartDto) {
    return new ReturnCartDTO(await this.cartService.updateProductInCart(updateCartDto, userId));
  }

  @Delete()
  @ApiUnauthorizedResponse({ description: 'Not authorized!' })
  remove(@UserId() id: number) {
    return this.cartService.clearCart(id);
  }
  @Delete('/product/:productId')
  @ApiUnauthorizedResponse({ description: 'Not authorized!' })
  removeProduct(@Param('productId') produtoId: number, @UserId() id: number) {
    return this.cartService.deleteProductCart(produtoId, id);
  }
}
