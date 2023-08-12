import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { ProductEntityMock } from '../__mocks__/product.mock';
import { CreateProductMock } from '../__mocks__/create-product.mock';
import { returnProductMock } from '../__mocks__/return-product.mock';
import { ReturnDeleteMock } from '../../__mocks__/return-delete.mock';
import { updateProductMock } from '../__mocks__/update-product.mock';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{
        provide: ProductService, 
        useValue:{
        create: jest.fn().mockResolvedValue(ProductEntityMock),
        findAll: jest.fn().mockResolvedValue([returnProductMock]),
        findProductBy: jest.fn().mockResolvedValue(returnProductMock),
        updateProductById: jest.fn().mockResolvedValue(ProductEntityMock),
        removeProductById: jest.fn().mockResolvedValue(ReturnDeleteMock)

      }}],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return the product after saving', async ()=>{
    const product = await controller.createProduct(CreateProductMock)

    expect(product).toEqual(ProductEntityMock)
  })

  it('should return a list of the products', async ()=>{
    const product = await controller.findAllProducts()

    expect(product).toEqual([returnProductMock])
  })

  it('should return a products by id', async ()=>{
    const product = await controller.findOneProduct(ProductEntityMock.id)

    expect(product).toEqual(returnProductMock)
  })

  it('should return a products removed', async ()=>{
    const product = await controller.removeProduct(ProductEntityMock.id)

    expect(product).toEqual(ReturnDeleteMock)
  })

  it('should return the product after updated', async ()=>{
    const product = await controller.updateProduct(ProductEntityMock.id, updateProductMock)

    expect(product).toEqual(ProductEntityMock)
  })
});
