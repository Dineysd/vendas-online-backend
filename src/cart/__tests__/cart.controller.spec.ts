import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';
import { returnCartMock } from '../__mocks__/return-cart-mock';
import { CreateCartMock } from '../../cart-product/__mocks__/create-cart.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { ReturnDeleteMock } from '../../__mocks__/return-delete.mock';
import { UpdateCartMock } from '../../cart-product/__mocks__/update-cart.mock';
import { ProductEntityMock } from '../../product/__mocks__/product.mock';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [{ provide: CartService, 
        useValue: {
          insertProductInCart: jest.fn().mockResolvedValue(returnCartMock),
          findCartByUserId: jest.fn().mockResolvedValue(returnCartMock),
          clearCart: jest.fn().mockResolvedValue(ReturnDeleteMock),
          updateProductInCart: jest.fn().mockResolvedValue(returnCartMock),
          deleteProductCart: jest.fn().mockResolvedValue(ReturnDeleteMock),
        },
    }],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should cart Entity in insertProductInCart', async () => {
    const cart = await controller.create(CreateCartMock, userEntityMock.id);

    expect(cart).toEqual(returnCartMock);
  });
  it('should cart Entity in findCartByUSerId', async () => {
    const cart = await controller.findCartByUSerId(userEntityMock.id);

    expect(cart).toEqual(returnCartMock);
  });

  it('should return cart delete in remove cart', async () => {
    const cart = await controller.remove(userEntityMock.id);

    expect(cart).toEqual(ReturnDeleteMock);
  });

  it('should return cart Entity in update cart', async () => {
    const cart = await controller.update(userEntityMock.id, UpdateCartMock);

    expect(cart).toEqual(returnCartMock);
  });

  it('should retun delete cart porduct in removeProduct cart', async () => {
    const cart = await controller.removeProduct(ProductEntityMock.id ,userEntityMock.id);

    expect(cart).toEqual(ReturnDeleteMock);
  });

});
