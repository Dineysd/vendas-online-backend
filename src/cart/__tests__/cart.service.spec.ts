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
            deleteProductCart: jest.fn().mockResolvedValue(ReturnDeleteMock),
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
});
