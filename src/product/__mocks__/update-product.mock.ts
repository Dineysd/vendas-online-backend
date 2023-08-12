import { UpdateProductDto } from "../dto/update-product.dto";
import { CategoryMock } from "../../category/__mocks__/category.mock";

export const updateProductMock: UpdateProductDto = {
    categoryId: CategoryMock.id,
    name: "mockd",
    price: 98,
    image: "mocks.png"
}