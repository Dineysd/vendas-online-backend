import { UpdateCartDto } from '../../cart/dto/update-cart.dto';
import { ProductEntityMock } from '../../product/__mocks__/product.mock';

export const UpdateCartMock: UpdateCartDto = {
  amount: 54638,
  productId: ProductEntityMock.id,
};