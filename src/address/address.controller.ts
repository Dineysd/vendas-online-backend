import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserType } from '../user/enums/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { ReturnAddressDto } from "../address/dtos/return-address.dto";
import { AddressEntity } from './entities/address.entity';
import { UserId } from '../decorators/user-id.decorator';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
@ApiTags('Address')
@Roles(UserType.User, UserType.Admin)
@Controller('address')
@ApiBearerAuth()
export class AddressController {
    constructor(private readonly service: AddressService){}
    
    @Post()
    @UsePipes(ValidationPipe)
    @ApiBody({ type: CreateAddressDto })
    @ApiCreatedResponse({
        description: 'Address by user Created Successfully!',
        type: AddressEntity,
    })
    @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    async createAddress(@Body() dto: CreateAddressDto, 
    @UserId() userId: number): Promise<AddressEntity>{
        return this.service.createAddress(dto, userId);
    }



    @Get()
    @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    @ApiResponse({
        description: 'return of Address data by id user!',
        status: 200,
        type: [ReturnAddressDto],
    })
    async findAddressByUserId(@UserId() userId: number,
    ): Promise<ReturnAddressDto[]> {
        return (await this.service.findAllAddressByUserId(userId)).map(
        (address) => new ReturnAddressDto(address),
        );
    }
}
