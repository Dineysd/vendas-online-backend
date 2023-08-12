import { Test, TestingModule } from "@nestjs/testing";
import { CityController } from "../city.controller";
import { CityEntityMock } from "../__mocks__/city.mock";
import { CityService } from "../city.service";
import { StateEntityMock } from "../../state/__mocks__/state.mock";

describe('CityController', () => {
    let controller: CityController;
    let cityService: CityService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: CityService,
            useValue: {
              getAllCacheCitiesByStateId: jest.fn().mockResolvedValue([CityEntityMock]),
            },
          },
        ],
        controllers: [CityController],
      }).compile();
  
      controller = module.get<CityController>(CityController);
      cityService = module.get<CityService>(CityService);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(cityService).toBeDefined();
    });

    it('shound return list a of the cities', async ()=>{
      const returnLogin = await controller.getAllCitiesByStateId(StateEntityMock.id)

      expect(returnLogin).toEqual([CityEntityMock])
    })
    
});