import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReturnCategory } from './dto/return-category.dto';
import { UserType } from '../user/enums/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';
@ApiTags('Category')
@Roles(UserType.User, UserType.Admin)
@Controller('category')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  @ApiBody({ type: CreateCategoryDto })
    @ApiCreatedResponse({
        description: 'Category Created Successfully!',
        type: CategoryEntity,
    })
    @ApiUnauthorizedResponse({ description: 'Not authorized!' })
  create(@Body() createCategoryDto: CreateCategoryDto)  {
    return this.categoryService.create(createCategoryDto);
  }
  @Roles(UserType.Admin)
  @Get()
  @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    @ApiResponse({
        description: 'return of category data!!',
        status: 200,
        type: [ReturnCategory],
    })
  findAll() : Promise<ReturnCategory[]>{
    return this.categoryService.findAll();
  }

  @Get(':categoryId')
  @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    @ApiResponse({
        description: 'return of category data by id!',
        status: 200,
        type: CategoryEntity,
    })
  async findCategoryById(
    @Param('categoryId') categoryId: number,
  ): Promise<ReturnCategory> {
    return new ReturnCategory(
      await this.categoryService.findCategoryById(categoryId),
    );
  }
}
