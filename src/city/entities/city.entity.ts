import { BaseGeneric } from "src/model-base/base-generic.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'city' })
export class CityEntity extends BaseGeneric{

  @Column({ name: 'state_id', nullable: false })
  stateId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

}