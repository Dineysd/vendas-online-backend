import { ApiProperty } from '@nestjs/swagger';
import { ReturnCityDto } from '../../city/dtos/return-city.dto';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  complement: string;
  @ApiProperty()
  numberAddress: number;
  @ApiProperty()
  cep: string;
  @ApiProperty()
  city?: ReturnCityDto;

  constructor(address: AddressEntity) {
    this.id = address.id;
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}