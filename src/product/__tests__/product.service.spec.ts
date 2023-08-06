import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntityMock } from '../__mocks__/product.mock';
import { CreateProductMock } from '../__mocks__/create-product.mock';
import { CategoryService } from '../../category/category.service';
import { CategoryMock } from '../../category/__mocks__/category.mock';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<ProductEntity>
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, 
      {
        provide: CategoryService,
        useValue: {
          findCategoryById: jest.fn().mockResolvedValue(CategoryMock),
        },
      },
      {
        provide: getRepositoryToken(ProductEntity),
        useValue:{
          find: jest.fn().mockResolvedValue([ProductEntityMock]),
          save: jest.fn().mockResolvedValue(ProductEntityMock)
        }
      }],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return list products', async () => {
    const products = await service.findAll();

    expect(products).toEqual([ProductEntityMock])
  });

  it('should return error in list products empty', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([])

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return error in list products exception', async () => {
    jest.spyOn(repository, 'find').mockRejectedValue(new Error())

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return product after insert in DB', async () => {
    const product = await service.create(CreateProductMock);

    expect(product).toEqual(ProductEntityMock);
  });

  it('should return erro in category by id create product in DB', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new Error());

    expect(service.create(CreateProductMock)).rejects.toThrowError();
  });


});
