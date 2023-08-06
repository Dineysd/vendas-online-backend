import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ReturnProductDto } from './dto/return-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enums/user-type.enum';
@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(createProductDto);
  }
  
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAll())
    .map((product) => new ReturnProductDto(product));
  }
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findProductBy(id);
  }
  @Roles(UserType.Admin,)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProductById(id, updateProductDto);
  }
  @Roles(UserType.Admin)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.removeProductById(id);
  }
}
