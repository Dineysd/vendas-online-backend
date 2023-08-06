import { CategoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDto } from "../dto/create-product.dto";

export const CreateProductMock: CreateProductDto ={
    name: "teste",
    categoryId: CategoryMock.id,
    price: 0,
    image: "teste.jpg"
}