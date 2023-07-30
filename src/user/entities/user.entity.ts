import { BaseGeneric } from 'src/model-base/base-generic.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'user'})
export class UserEntity extends BaseGeneric {
    @Column({name: 'name', nullable: false })
    name: string;
    @Column({name: 'email', nullable: false})
    email: string;
    @Column({name: 'phone'})
    phone: string;
    @Column({name: 'cpf', nullable: false })
    cpf: string;
    @Column({name: 'password', nullable: false })
    password: string;
    @Column({name: 'type_user', nullable: false })
    type_user: number;

}