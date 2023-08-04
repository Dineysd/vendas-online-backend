import { Test, TestingModule } from "@nestjs/testing";
import { StateEntity } from "../entities/state.entity";
import { StateService } from "../state.service"
import {Repository} from "typeorm"
import {getRepositoryToken} from "@nestjs/typeorm"
import {StateEntityMock} from "../__mocks__/state.mock"

describe('StateService', () => {
    let service: StateService;
    let repository: Repository<StateEntity>

    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [StateService, 
                {
                provide: getRepositoryToken(StateEntity),
                useValue: {
                    find: jest.fn().mockResolvedValue([StateEntityMock]),

                }
            },]
        }).compile();

        service = module.get<StateService>(StateService);
        repository = module.get<Repository<StateEntity>>
        (getRepositoryToken(StateEntity));

    })

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    })

    it('should return list states', async () => {
        const state = await service.getAllState();

        expect(state).toEqual([StateEntityMock]);
    })

    it('should return error in exception', async () => {
        jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());
    
        expect(service.getAllState()).rejects.toThrowError();
      });

})