import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { AddressEntity } from './entities/address.entity';

@Controller('address')
export class AddressController {
    constructor(private readonly service: AddressService){}
    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(@Body() dto: CreateAddressDto, @Param('userId') userId: number): Promise<AddressEntity>{
        return this.service.createAddress(dto, userId);
    }
}
