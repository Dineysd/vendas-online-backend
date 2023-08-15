import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from './city.service';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
@ApiTags('City')
@Controller('city')
@ApiBearerAuth()
export class CityController {
    constructor(private readonly serviceCity: CityService){}

  @Get('/:stateId')
  @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    @ApiResponse({
        description: 'return of city data by id State!!',
        status: 200,
        type: [CityEntity],
    })
  async getAllCitiesByStateId(
    @Param('stateId') stateId: number): Promise<CityEntity[]> {
    return  this.serviceCity.getAllCacheCitiesByStateId(stateId);
  }
}
