import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from '../entities/cart-product.entity';
import { ProductEntityMock } from '../../product/__mocks__/product.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProductMock } from '../__mocks__/cart-product.mock';
import { CartEntityMock } from '../../cart/__mocks__/cart.mock';
import { ReturnDeleteMock } from '../../__mocks__/return-delete.mock';
import { CreateCartMock } from '../__mocks__/create-cart.mock';

describe('CartProductService', () => {
  let service: CartProductService;
  let productService: ProductService
  let cartProductRepository: Repository<CartProductEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartProductService,
      {
        provide: ProductService,
        useValue:{
          findProductBy: jest.fn().mockResolvedValue(ProductEntityMock)
        }
      },
      {
        provide: getRepositoryToken(CartProductEntity),
        useValue:{
          findOne: jest.fn().mockResolvedValue(CartProductMock),
          save: jest.fn().mockResolvedValue(CartProductMock),
          delete: jest.fn().mockResolvedValue(ReturnDeleteMock)
        }
      }
    ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
  });

  it('should return Delete Result after delete product', async () => {
    const deleteResult = await service.deleteProductInCart(
      ProductEntityMock.id,
      CartEntityMock.id,
    );

    expect(deleteResult).toEqual(ReturnDeleteMock);
  });

  it('should return error in exception delete', async () => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error());

    expect(
      service.deleteProductInCart(ProductEntityMock.id, CartEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return CartProduct after create', async () => {
    const productCart = await service.createProductInCart(
      CreateCartMock,
      CartEntityMock.id,
    );

    expect(productCart).toEqual(CartProductMock);
  });

  it('should return error in exception delete', async () => {
    jest.spyOn(cartProductRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.createProductInCart(CreateCartMock, CartEntityMock.id),
    ).rejects.toThrowError();
  });

});
