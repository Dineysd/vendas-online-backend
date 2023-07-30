import { CityEntity } from "../../city/entities/city.entity";
import { BaseGeneric } from "../../model-base/base-generic.entity";
  import { Column, Entity, OneToMany } from "typeorm";

  @Entity({ name: 'state' })
  export class StateEntity extends BaseGeneric {

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'uf', nullable: true})
    uf: string;

    @OneToMany(() => CityEntity, (city) => city.state)
    cities?: CityEntity[];

  }