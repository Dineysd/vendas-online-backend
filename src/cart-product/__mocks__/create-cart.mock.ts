import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import { ProductEntityMock } from '../../product/__mocks__/product.mock';

export const CreateCartMock: CreateCartDto = {
  amount: 535,
  productId: ProductEntityMock.id,
};