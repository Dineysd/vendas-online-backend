import { ProductEntity } from "../../product/entities/product.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseGeneric } from "../../model-base/base-generic.entity";

@Entity({name: 'category'})
export class CategoryEntity extends BaseGeneric {
  @Column({ name: 'name', nullable: false })
  name: string;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.category)
  products?: ProductEntity[]
}
