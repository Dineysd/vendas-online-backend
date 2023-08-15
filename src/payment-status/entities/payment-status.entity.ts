import { BaseGeneric } from "src/model-base/base-generic.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'payment_status'})
export class PaymentStatusEntity extends BaseGeneric {
    @Column({name: 'name', nullable: false})
    name: string;

}