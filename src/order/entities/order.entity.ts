import { OrderProductEntity } from "../../order-product/entities/order-product.entity";
import { AddressEntity } from "../../address/entities/address.entity";
import { BaseGeneric } from "../../model-base/base-generic.entity";
import { PaymentEntity } from "../../payment/entities/payment.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'order' })
export class OrderEntity extends BaseGeneric{

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'address_id', nullable: false })
  addressId: number;

  @Column({ name: 'date', nullable: false })
  date: Date;

  @Column({ name: 'payment_id', nullable: false })
  paymentId: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.orders)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address?: AddressEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.orders)
  @JoinColumn({ name: 'payment_id', referencedColumnName: 'id' })
  payment?: PaymentEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
  ordersProduct?: OrderProductEntity[];

  amountProducts?: number;

}
