import { BaseGeneric } from "../../model-base/base-generic.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { CartProductEntity } from "../../cart-product/entities/cart-product.entity";
@Entity({name: 'cart'})
export class CartEntity extends BaseGeneric {

  @Column({ name: 'user_id', nullable: false })
  userId: number;
  
  @Column({name: 'active', nullable: false})
  active: boolean;

  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cart)
  cartProduct?: CartProductEntity[];

}
