import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReturnCategory } from './dto/return-category.dto';
import { UserType } from '../user/enums/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { Validate } from 'class-validator';

@Roles(UserType.User, UserType.Admin)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto)  {
    return this.categoryService.create(createCategoryDto);
  }
  @Roles(UserType.Admin)
  @Get()
  findAll() : Promise<ReturnCategory[]>{
    return this.categoryService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return ;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return ;//this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return ;//this.categoryService.remove(+id);
  }
}
