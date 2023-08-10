import { CategoryEntity } from "../../category/entities/category.entity";
import { BaseGeneric } from "../../model-base/base-generic.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { CartProductEntity } from "../../cart-product/entities/cart-product.entity";

@Entity({name: 'product'})
export class ProductEntity extends BaseGeneric {
  @ApiProperty()
  @Column({ name: 'name', nullable: false })
  name: string;
  @ApiProperty()
  @Column({ name: 'category_id', nullable: false })
  categoryId: number;
  @ApiProperty()
  @Column({ name: 'price', type: 'decimal', nullable: false })
  price: number;
  @ApiProperty()
  @Column({ name: 'image', nullable: false })
  image: string;
  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.products,
  )
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: CategoryEntity;

  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.product)
  cartProduct?: CartProductEntity[];
}
