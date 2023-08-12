import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ReturnProductDto } from './dto/return-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enums/user-type.enum';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
@ApiTags('Product')
@Roles(UserType.Admin, UserType.User)
@Controller('product')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  @ApiBody({ type: CreateProductDto })
    @ApiCreatedResponse({
        description: 'Product Created Successfully!',
        type: ProductEntity,
    })
    @ApiUnauthorizedResponse({ description: 'Not authorized!' })
  createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(createProductDto);
  }
  
  @UsePipes(ValidationPipe)
  @Get()
  @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    @ApiResponse({
        description: 'return of product data!!',
        status: 200,
        type: [ReturnProductDto],
    })
  async findAllProducts(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAll())
    .map((product) => new ReturnProductDto(product));
  }
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Get(':id')
  @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    @ApiResponse({
        description: 'return of product data by id!!',
        status: 200,
        type: ProductEntity,
    })
  findOneProduct(@Param('id') id: number) {
    return this.productService.findProductBy(id);
  }
  @Roles(UserType.Admin,)
  @Put(':id')
  @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    @ApiResponse({
        description: 'Product password updated successfully!',
        status: 200,
        type: ProductEntity,
    })
  updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProductById(id, updateProductDto);
  }
  @Roles(UserType.Admin)
  @Delete(':id')
  @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    @ApiResponse({
        description: 'return of product removed by id!!',
        status: 200,
        type: DeleteResult,
    })
  removeProduct(@Param('id') id: number) {
    return this.productService.removeProductById(id);
  }
}
