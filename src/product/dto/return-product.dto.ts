import { ProductEntity } from "../entities/product.entity";

export class ReturnProductDto {
    name: string;
    categoryId: number;
    price: number;
    image: string;
    id: number;
    
    constructor(product: ProductEntity){
        this.categoryId = product.categoryId;
        this.name = product.name;
        this.price = product.price;
        this.image = product.image;
        this.id = product.id;
    }
}