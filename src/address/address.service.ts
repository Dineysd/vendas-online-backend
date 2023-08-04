import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm'
import { AddressEntity } from './entities/address.entity';
import { InjectRepository } from'@nestjs/typeorm';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';
@Injectable()
export class AddressService {
    constructor(@InjectRepository(AddressEntity) 
    private readonly repo: Repository<AddressEntity>,
    private readonly userService: UserService, 
    private readonly cityService: CityService){}

    async createAddress(dto : CreateAddressDto, user_id: number): Promise<AddressEntity> {
        await this.userService.findUserById(user_id)
        await this.cityService.findCityById(dto.cityId)

        return this.repo.save({...dto, user_id})
    }

    async findAllAddressByUserId(user_id: number): Promise<AddressEntity[]>{
        const address = await this.repo.find({
            where: {user_id},
            relations: {
                  city: {
                    state: true,
                  },
              },
        });
        if(!address || address.length == 0){
            throw new NotFoundException(`userId: ${user_id} Not Found`);
        }
        return address;
      }
}
