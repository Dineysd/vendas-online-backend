import { BaseGeneric } from "src/model-base/base-generic.entity";
import { Column, Entity } from "typeorm";

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

}
