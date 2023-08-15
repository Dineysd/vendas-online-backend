import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProductService } from '../../cart-product/cart-product.service';
import { CartEntityMock } from '../__mocks__/cart.mock';
import { ReturnDeleteMock } from '../../__mocks__/return-delete.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { CreateCartMock } from '../../cart-product/__mocks__/create-cart.mock';
import { ProductEntityMock } from '../../product/__mocks__/product.mock';
import { UpdateCartMock } from '../../cart-product/__mocks__/update-cart.mock';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<CartEntity>;
  let cartProductService: CartProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, 
        {
          provide: CartProductService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(undefined),
            deleteProductInCart: jest.fn().mockResolvedValue(ReturnDeleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(undefined),
          },
        },
      {
        provide: getRepositoryToken(CartEntity),
        useValue: {
          save: jest.fn().mockResolvedValue(CartEntityMock),
          findOne: jest.fn().mockResolvedValue(CartEntityMock),
        }
      }],
    }).compile();

    service = module.get<CartService>(CartService);
    cartProductService = module.get<CartProductService>(CartProductService);
    cartRepository = module.get<Repository<CartEntity>>(
      getRepositoryToken(CartEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartProductService).toBeDefined();
    expect(cartRepository).toBeDefined();
  });

  it('should return delete result if clear cart', async () => {
    const spy = jest.spyOn(cartRepository,'save')

    const resultClear = await service.clearCart(userEntityMock.id)

    expect(resultClear).toEqual(ReturnDeleteMock);
    expect(spy.mock.calls[0][0]).toEqual({...CartEntityMock, active: false});
  });

  it('should return findOne undefined', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.clearCart(userEntityMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  })

  it('should return cart in success (not send relations)', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findCartByUserId(userEntityMock.id);

    expect(cart).toEqual(CartEntityMock);
    expect(spy.mock.calls[0][0].relations).toEqual(undefined);
  });

  it('should return cart in sucess (send relations)', async () =>{
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findCartByUserId(userEntityMock.id, true);

    expect(cart).toEqual(CartEntityMock);
    expect(spy.mock.calls[0][0].relations).toEqual({
      cartProduct: {
      product: true,
    }},)
  });

  it('should return notFoundExcpetion in not found cart', async ()=> {
    jest.spyOn(cartRepository,'findOne').mockResolvedValue(undefined)

    expect(service.findCartByUserId(userEntityMock.id))
    .rejects.toThrowError(NotFoundException)
  })

  it('should return send info in save (createCart)', async () => {
    const spy = jest.spyOn(cartRepository, 'save');

    const cart = await service.createCart(userEntityMock.id);

    expect(cart).toEqual(CartEntityMock);
    expect(spy.mock.calls[0][0]).toEqual({
      active: true,
      userId: userEntityMock.id,
    });
  });

  it('should return cart in cart not found (insertProductInCart)', async () => {
    jest.spyOn(cartRepository, 'findOne').mockRejectedValue(undefined);
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'insertProductInCart',
    );

    const cart = await service.insertProductInCart(
      CreateCartMock,
      userEntityMock.id,
    );

    expect(cart).toEqual(CartEntityMock);
    expect(spy.mock.calls.length).toEqual(1);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return cart in cart found (insertProductInCart)', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'insertProductInCart',
    );

    const cart = await service.insertProductInCart(
      CreateCartMock,
      userEntityMock.id,
    );

    expect(cart).toEqual(CartEntityMock);
    expect(spy.mock.calls.length).toEqual(0);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return DeleteResult in deleteProductCart', async ()=> {
    const spy = jest.spyOn(cartProductService, 'deleteProductInCart');
    const deletResult = await service.deleteProductCart(
      ProductEntityMock.id,
      userEntityMock.id
    );

    expect(deletResult).toEqual(ReturnDeleteMock)
    expect(spy.mock.calls.length).toEqual(1)
  });

  it('should return NotFoundException in cart not exist', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    const spy = jest.spyOn(cartProductService, 'deleteProductInCart');

    expect(
      service.deleteProductCart(ProductEntityMock.id, userEntityMock.id),
    ).rejects.toThrowError(NotFoundException);
    expect(spy.mock.calls.length).toEqual(0);
  });

  it('should return cart in updateProductInCart', async () => {
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'updateProductInCart',
    );
    const spySave = jest.spyOn(cartRepository, 'save');
    const cart = await service.updateProductInCart(
      UpdateCartMock,
      userEntityMock.id,
    );

    expect(cart).toEqual(CartEntityMock);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
    expect(spySave.mock.calls.length).toEqual(0);
  });

  it('return cartProduct created', async ()=> {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined)

    const spy = jest.spyOn(cartRepository, 'save');

    const cart = await service.updateProductInCart(
      UpdateCartMock, 
      userEntityMock.id)

    expect(cart).toEqual(CartEntityMock);
    expect(spy.mock.calls.length). toEqual(1)

  })
});
