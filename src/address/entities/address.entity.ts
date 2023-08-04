import { UserEntity } from "../../user/entities/user.entity";
import { BaseGeneric } from "../../model-base/base-generic.entity";
import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { CityEntity } from "../../city/entities/city.entity";

@Entity({ name: 'address' })
export class AddressEntity extends BaseGeneric {

  @Column({ name: 'user_id', nullable: false })
  user_id: number;

  @Column({ name: 'complement', nullable: true })
  complement: string;

  @Column({ name: 'number', nullable: false })
  numberAddress: number;

  @Column({ name: 'cep', nullable: false })
  cep: string;

  @Column({ name: 'city_id', nullable: false })
  cityId: number;
  
  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @ManyToOne(() => CityEntity, (city) => city.addresses)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city?: CityEntity;
}