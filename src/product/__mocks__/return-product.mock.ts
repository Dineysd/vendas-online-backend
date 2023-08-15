import { CategoryMock } from "../../category/__mocks__/category.mock";
import { ReturnProductDto } from "../dto/return-product.dto";

export const returnProductMock: ReturnProductDto ={
    name: "mock",
    categoryId: CategoryMock.id,
    price: 99,
    image: "mock.png",
    id: 99
}