import { BaseGeneric } from "src/model-base/base-generic.entity";
import { Column, Entity, TableInheritance } from "typeorm";

@Entity({ name: 'payment' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class PaymentEntity extends BaseGeneric{
  
    @Column({ name: 'status_id', nullable: false })
    statusId: number;
  
    @Column({ name: 'price', nullable: false })
    price: number;
  
    @Column({ name: 'discount', nullable: false })
    discount: number;
  
    @Column({ name: 'final_price', nullable: false })
    finalPrice: number;
  
    @Column({ name: 'type', nullable: false })
    type: string;

}