import { CityEntity } from "../entities/city.entity";
import {Repository} from "typeorm"
import { Test, TestingModule } from "@nestjs/testing";
import { CityService } from "../city.service";
import {getRepositoryToken} from "@nestjs/typeorm"
import { CacheService } from "../../cache/cache.service";
import { CityEntityMock } from "../__mocks__/city.mock";

describe('CityService', () =>{
    let service: CityService;
  let repository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([CityEntityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(CityEntityMock),
            find: jest.fn().mockResolvedValue([CityEntityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    repository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    })

    it('should return city in findCityById', async () => {
        const city = await service.findCityById(CityEntityMock.stateId)
        
        expect(city).toEqual(CityEntityMock);
    })

    it('should return error findOne not found', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
    
        expect(service.findCityById(CityEntityMock.id)).rejects.toThrowError();
      });
    
      it('should return Cities in getAllCacheCitiesByStateId', async () => {
        const cacheCities = await service.getAllCacheCitiesByStateId(CityEntityMock.stateId);
    
        expect(cacheCities).toEqual([CityEntityMock]);
      });

      it('should return Cities in getAllCitiesByStateId', async () => {
        const cities = await service.findAllCitiesByStateId(CityEntityMock.stateId);
    
        expect(cities).toEqual([CityEntityMock]);
      });
});