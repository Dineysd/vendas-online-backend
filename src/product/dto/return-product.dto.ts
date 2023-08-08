import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "../entities/product.entity";

export class ReturnProductDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    categoryId: number;
    @ApiProperty()
    price: number;
    @ApiProperty()
    image: string;
    @ApiProperty()
    id: number;
    
    constructor(product: ProductEntity){
        this.categoryId = product.categoryId;
        this.name = product.name;
        this.price = product.price;
        this.image = product.image;
        this.id = product.id;
    }
}