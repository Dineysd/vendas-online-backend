import { BaseGeneric } from "../../model-base/base-generic.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { CartProductEntity } from "../../cart-product/entities/cart-product.entity";
import { ApiProperty } from "@nestjs/swagger";
@Entity({name: 'cart'})
export class CartEntity extends BaseGeneric {
  @ApiProperty()
  @Column({ name: 'user_id', nullable: false })
  userId: number;
  @ApiProperty()
  @Column({name: 'active', nullable: false})
  active: boolean;
  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cart)
  cartProduct?: CartProductEntity[];

}
