import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache){}

    async getCache<T>(key: string, functionReques: () => Promise<T> ): Promise<T> {
        const cacheData: T = await this.cacheManager.get(key);

        if(cacheData){
            return cacheData;
        }

        const data: T =  await functionReques()

        await this.cacheManager.set(key, data);

        return data;
    }
}
