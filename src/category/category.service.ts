import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ReturnCategory } from './dto/return-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private readonly repository: Repository<CategoryEntity>){}

  async create(dto: CreateCategoryDto): Promise<CategoryEntity>  {
    const category = await this.findCategoryByName(dto.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException(
        `Category name ${dto.name} exist`,
      );
    }
    return this.repository.save(dto);
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.repository.findOne({
      where: {
        name,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category name ${name} not found`);
    }

    return category;
  }

  async findAll(): Promise<ReturnCategory[]> { 
    const categories = await this.repository.find();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories empty');
    }
    return categories.map((category) => new ReturnCategory(category));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
