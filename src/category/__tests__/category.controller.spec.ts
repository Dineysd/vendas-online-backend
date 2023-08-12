import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { CategoryMock } from '../__mocks__/category.mock';
import { returnCategoyMock } from '../__mocks__/return-category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers:[{
        provide: CategoryService, 
        useValue:{
          create: jest.fn().mockResolvedValue(CategoryMock),
          findAll: jest.fn().mockResolvedValue([returnCategoyMock]),
          findCategoryById: jest.fn().mockResolvedValue(returnCategoyMock),
        }
      }]
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return create category', async()=> {
    const create = await controller.create(createCategoryMock);

    expect(create).toEqual(CategoryMock)

  })

  it('should return a list of the category', async()=> {
    const findCategorys = await controller.findAll();

    expect(findCategorys).toEqual([returnCategoyMock])

  })

  it('should return a category', async()=> {
    const category = await controller.findCategoryById(CategoryMock.id);

    expect(category).toEqual(returnCategoyMock)

  })
});
