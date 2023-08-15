import { CartEntityMock } from '../../cart/__mocks__/cart.mock';
import { ProductEntityMock } from '../../product/__mocks__/product.mock';
import { CartProductEntity } from '../entities/cart-product.entity';

export const CartProductMock: CartProductEntity = {
  amount: 5435,
  cartId: CartEntityMock.id,
  createdAt: new Date(),
  id: 234,
  productId: ProductEntityMock.id,
  updatedAt: new Date(),
};