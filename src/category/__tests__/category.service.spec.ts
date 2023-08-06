import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';
import { ReturnCategory } from '../dto/return-category.dto';


describe('CategoryService', () => {
  let service: CategoryService;
  let catRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, {
        provide: getRepositoryToken(CategoryEntity),
        useValue:{
          findOne: jest.fn().mockResolvedValue(CategoryMock),
          find: jest.fn().mockResolvedValue([CategoryMock]),
          save: jest.fn().mockResolvedValue(CategoryMock),
          delete: jest.fn().mockResolvedValue(CategoryMock)
        }
      }],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    catRepository = module.get<Repository<CategoryEntity>>
    (getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list category', async () => {
    const categories = await service.findAll();

    expect(categories).toEqual([CategoryMock]
      .map((category) => new ReturnCategory(category)));
  });

  it('should return error in list category empty', async () => {
    jest.spyOn(catRepository, 'find').mockResolvedValue([]);

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return error in list category exception', async () => {
    jest.spyOn(catRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return error if exist category name', async () => {
    expect(service.create(createCategoryMock)).rejects.toThrowError();
  });

  it('should return category after save', async () => {
    jest.spyOn(catRepository, 'findOne').mockResolvedValue(undefined);

    const category = await service.create(createCategoryMock);

    expect(category).toEqual(CategoryMock);
  });

  it('should return error in exception', async () => {
    jest.spyOn(catRepository, 'save').mockRejectedValue(new Error());

    expect(service.create(createCategoryMock)).rejects.toThrowError();
  });

  it('should return category in find by name', async () => {
    const category = await service.findCategoryByName(CategoryMock.name);

    expect(category).toEqual(CategoryMock);
  });

  it('should return error if category find by name empty', async () => {
    jest.spyOn(catRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.findCategoryByName(CategoryMock.name),
    ).rejects.toThrowError();
  });

  // it('should return category in find by id', async () => {
  //   const category = await service.findCategoryById(CategoryMock.id);

  //   expect(category).toEqual(CategoryMock);
  // });

  // it('should return error in not found category id', async () => {
  //   jest.spyOn(catRepository, 'findOne').mockResolvedValue(undefined);

  //   expect(service.findCategoryById(CategoryMock.id)).rejects.toThrowError();
  // });
});
