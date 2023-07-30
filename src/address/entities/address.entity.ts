import { BaseGeneric } from "../../model-base/base-generic.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'address' })
export class AddressEntity extends BaseGeneric {

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'complement', nullable: true })
  complement: string;

  @Column({ name: 'number', nullable: false })
  numberAddress: number;

  @Column({ name: 'cep', nullable: false })
  cep: string;

  @Column({ name: 'city_id', nullable: false })
  cityId: number;
}