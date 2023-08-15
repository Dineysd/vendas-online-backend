import { Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
    constructor(@InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService){}

    async getAllCacheCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () =>
            this.findAllCitiesByStateId(stateId),
        );
    }

    async findAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        return this.cityRepository.find({
            where: {
                stateId,
            },
        });
    }

    async findCityById(cityId: number): Promise<CityEntity>{
        const city = await this.cityRepository.findOne({where: {id: cityId}});

        if(!city){
            throw new NotFoundException(`cityId: ${cityId} Not Found`);
        }

        return city;
    }
}
