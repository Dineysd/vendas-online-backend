import { Inject, Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CityService {
    constructor(@InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache){}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        const cacheKey = `cities-${stateId}`;
        const cacheCities: CityEntity[] = await this.cacheManager.get(cacheKey);

        if(cacheCities){
            return cacheCities;
        }

        const cities =  await this.cityRepository.find({
            where:{
                stateId,
            }
        })

        await this.cacheManager.set(cacheKey, cities);

        return cities;
    }
}
