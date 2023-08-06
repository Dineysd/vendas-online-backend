import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import{ Repository} from 'typeorm'

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly service: 
  Repository<ProductEntity>){}

  create(dto: CreateProductDto) {
    return this.service.save(dto);
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.service.find();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products empty');
    }
    return products
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
