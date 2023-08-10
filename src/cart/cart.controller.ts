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
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles(UserType.Admin)
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete()
  remove(@UserId() id: number) {
    return this.cartService.clearCart(id);
  }
}
