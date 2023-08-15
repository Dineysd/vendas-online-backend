import { BaseGeneric } from "../../model-base/base-generic.entity";
import { PaymentEntity } from "../../payment/entities/payment.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({name: 'payment_status'})
export class PaymentStatusEntity extends BaseGeneric {
  @Column({name: 'name', nullable: false})
  name: string;

  @OneToMany(() => PaymentEntity, (payment) => payment.paymentStatus)
  payments?: PaymentEntity[];

}