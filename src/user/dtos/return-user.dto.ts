import { ApiProperty } from "@nestjs/swagger";
import { ReturnAddressDto } from "../../address/dtos/return-address.dto";
import { UserEntity } from "../entities/user.entity";

export class ReturnUserDto{
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    cpf: string;
    @ApiProperty()
    addresses?: ReturnAddressDto[];

    constructor(userEntity: UserEntity){
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.email = userEntity.email;
        this.phone = userEntity.phone;
        this.cpf = userEntity.cpf;
        
        this.addresses = userEntity.addresses
      ? userEntity.addresses.map((address) => new ReturnAddressDto(address))
      : undefined;
    }
    
}