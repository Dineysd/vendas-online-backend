import { CategoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entities/product.entity";

export const ProductEntityMock: ProductEntity = {
    name: "Papel de Parede",
    categoryId: CategoryMock.id,
    price: 99,
    image: "papel_parede.jpg",
    id: 999,
    createdAt: new Date(),
    updatedAt: new Date()
}