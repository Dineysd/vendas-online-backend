import { BaseGeneric } from "../../model-base/base-generic.entity";
  import { Column, Entity } from "typeorm";

  @Entity({ name: 'state' })
  export class StateEntity extends BaseGeneric {

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'uf', nullable: true})
    uf: string;

  }