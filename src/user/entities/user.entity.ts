import { AddressEntity } from '../../address/entities/address.entity';
import { BaseGeneric } from '../../model-base/base-generic.entity';
import { Column, OneToMany, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity } from 'src/order/entities/order.entity';

@Entity({name: 'user'})
export class UserEntity extends BaseGeneric {
    @ApiProperty()
    @Column({name: 'name', nullable: false })
    name: string;
    @ApiProperty()
    @Column({name: 'email', nullable: false})
    email: string;
    @ApiProperty()
    @Column({name: 'phone'})
    phone: string;
    @ApiProperty()
    @Column({name: 'cpf', nullable: false })
    cpf: string;
    @Column({name: 'password', nullable: false })
    password: string;
    @Column({name: 'type_user', nullable: false })
    type_user: number;

    @OneToMany(() => AddressEntity, (address) => address.user)
    addresses?: AddressEntity[];
    
    @OneToMany(()=> OrderEntity, (order)=> order.address)
    orders?: OrderEntity[];

}