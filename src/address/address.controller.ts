import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserType } from '../user/enums/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { ReturnAddressDto } from "../address/dtos/return-address.dto";
import { AddressEntity } from './entities/address.entity';
import { UserId } from '../decorators/user-id.decorator';
@Roles(UserType.User)
@Controller('address')
export class AddressController {
    constructor(private readonly service: AddressService){}
    
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(@Body() dto: CreateAddressDto, 
    @UserId() userId: number): Promise<AddressEntity>{
        return this.service.createAddress(dto, userId);
    }



    @Get()
    async findAddressByUserId(@UserId() userId: number,
    ): Promise<ReturnAddressDto[]> {
        return (await this.service.findAllAddressByUserId(userId)).map(
        (address) => new ReturnAddressDto(address),
        );
    }
}
