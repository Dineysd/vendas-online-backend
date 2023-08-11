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
import { NotFoundException } from '@nestjs/common';
import { UpdateCartMock } from '../__mocks__/update-cart.mock';

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

  it('should return error in exception save', async () => {
    jest.spyOn(cartProductRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.createProductInCart(CreateCartMock, CartEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return CartProduct if exist', async () => {
    const productCart = await service.verifyProductInCart(
      ProductEntityMock.id,
      CartEntityMock.id,
    );

    expect(productCart).toEqual(CartProductMock);
  });

  it('should return error if not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.verifyProductInCart(ProductEntityMock.id, CartEntityMock.id),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return error in exception verifyProductInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      service.verifyProductInCart(ProductEntityMock.id, CartEntityMock.id),
    ).rejects.toThrowError(Error);
  });

  it('should return error in exception insertProductInCart', async () => {
    jest
      .spyOn(productService, 'findProductBy')
      .mockRejectedValue(new NotFoundException());

    expect(
      service.insertProductInCart(CreateCartMock, CartEntityMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cart product if not exist cart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    const cartProduct = await service.insertProductInCart(
      CreateCartMock,
      CartEntityMock,
    );

    expect(cartProduct).toEqual(CartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(CreateCartMock.amount);
  });

  it('should return cart product and total amount', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.insertProductInCart(
      CreateCartMock,
      CartEntityMock,
    );

    expect(cartProduct).toEqual(CartProductMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...CartProductMock,
      amount: CartProductMock.amount + CreateCartMock.amount,
    });
  });

  it('should return error in exception updateProductInCart', async () => {
    jest
      .spyOn(productService, 'findProductBy')
      .mockRejectedValue(new NotFoundException());

    expect(
      service.updateProductInCart(UpdateCartMock, CartEntityMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cart product if not found cart (updateProductInCart)', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.updateProductInCart(UpdateCartMock, CartEntityMock),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return cart product and amount cart update (updateProductInCart)', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.updateProductInCart(
      UpdateCartMock,
      CartEntityMock,
    );

    expect(cartProduct).toEqual(CartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(UpdateCartMock.amount);
  });

});
