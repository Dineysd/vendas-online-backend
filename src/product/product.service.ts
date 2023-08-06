import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import{ DeleteResult, Repository, UpdateResult} from 'typeorm'
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly service: 
  Repository<ProductEntity>,
  @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,){}

  async create(dto: CreateProductDto) {
    await this.categoryService.findCategoryById(dto.categoryId);
    
    return this.service.save({...dto});
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.service.find();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products empty');
    }
    return products
  }

  async findProductBy(id: number): Promise<ProductEntity> {
    const product = await this.service.findOne({
      where:{
        id
      }
    });
    if(!product){
      throw new NotFoundException(`Product  id: ${id} not found`);
    }

    return product;
  }

  async updateProductById(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findProductBy(id);

    return this.service.save({
      ...product,
      ...updateProductDto,
    });
  }

  async removeProductById(id: number): Promise<DeleteResult> {
    await this.findProductBy(id);

    return this.service.delete(id);
  }
}
