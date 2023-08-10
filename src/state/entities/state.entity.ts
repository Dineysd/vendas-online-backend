import { CityEntity } from "../../city/entities/city.entity";
import { BaseGeneric } from "../../model-base/base-generic.entity";
  import { Column, Entity, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

  @Entity({ name: 'state' })
  export class StateEntity extends BaseGeneric {
    @ApiProperty()
    @Column({ name: 'name', nullable: false })
    name: string;
    @ApiProperty()
    @Column({ name: 'uf', nullable: true})
    uf: string;
    @ApiProperty()
    @OneToMany(() => CityEntity, (city) => city.state)
    cities?: CityEntity[];

  }