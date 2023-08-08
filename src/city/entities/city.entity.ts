import { AddressEntity } from "../../address/entities/address.entity";
import { BaseGeneric } from "../../model-base/base-generic.entity";
import { StateEntity } from "../../state/entities/state.entity";
import { Column, Entity , ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'city' })
export class CityEntity extends BaseGeneric{
  @ApiProperty()
  @Column({ name: 'state_id', nullable: false })
  stateId: number;
  @ApiProperty()
  @Column({ name: 'name', nullable: false })
  name: string;
  @ApiProperty()
  @ManyToOne(() => StateEntity, (state) => state.cities)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state?: StateEntity;
  @ApiProperty()
  @OneToMany(() => AddressEntity, (address) => address.city)
  addresses?: AddressEntity[];

}