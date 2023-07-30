import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'
import { AddressEntity } from './entities/address.entity';
import { InjectRepository } from'@nestjs/typeorm';
import { CreateAddressDto } from './dtos/create-address.dto';
@Injectable()
export class AddressService {
    constructor(@InjectRepository(AddressEntity) 
    private readonly repo: Repository<AddressEntity>){}

    async createAddress(dto : CreateAddressDto, user_id: number): Promise<AddressEntity> {
        console.log(CreateAddressDto, user_id )
        return this.repo.save({...dto, user_id})
    }
}
