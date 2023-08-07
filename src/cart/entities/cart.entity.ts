import { BaseGeneric } from "../../model-base/base-generic.entity";
import { Column } from "typeorm";

export class CartEntity extends BaseGeneric {

    @Column({ name: 'user_id', nullable: false })
    userId: number;

}
