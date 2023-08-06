import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CityService } from "../../city/city.service";
import { CityEntityMock } from "../../city/__mocks__/city.mock";
import { UserService } from "../../user/user.service";
import { userEntityMock } from "../../user/__mocks__/user.mock";
import { Repository } from "typeorm";
import { AddressService } from "../address.service";
import { AddressEntity } from "../entities/address.entity";
import { AddressEntityMock } from "../__mocks__/address.mock";
import { CreateAddressMock } from "../__mocks__/create-address.mock";

describe('CityService', () =>{
  let Address_service: AddressService;
  let userService: UserService;
  let cityService: CityService;
  let repository: Repository<AddressEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
            provide: UserService,
            useValue: {
              findUserById: jest.fn().mockResolvedValue(userEntityMock),
            },
          },
          {
            provide: CityService,
            useValue: {
              findCityById: jest.fn().mockResolvedValue(CityEntityMock),
            },
          },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(AddressEntityMock),
            find: jest.fn().mockResolvedValue([AddressEntityMock]),
          },
        },
      ],
    }).compile();

    Address_service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    repository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

    it('should be defined', () => {
        expect(Address_service).toBeDefined();
        expect(userService).toBeDefined();
        expect(cityService).toBeDefined();
        expect(repository).toBeDefined();
    })

    it('should return address afte save', async ()=>{
        const address = await Address_service.
        createAddress(CreateAddressMock, userEntityMock.id)

        expect(address).toEqual(AddressEntityMock)
    })

    it('should return error if exception in userService', async() => {
        jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());

        expect(Address_service.createAddress(CreateAddressMock, userEntityMock.id)).rejects.toThrowError()
    })

    it('should return error if exception in cityService', async () => {
        jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());
    
        expect(
          Address_service.createAddress(CreateAddressMock, userEntityMock.id),
        ).rejects.toThrowError();
    });

    it('should return All address to User', async () => {
        const address = await Address_service.findAllAddressByUserId(userEntityMock.id);
        
        expect(address).toEqual([AddressEntityMock]);
    });

    it('should return not found if not address register', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());
    
        expect(
          Address_service.findAllAddressByUserId(userEntityMock.id),
        ).rejects.toThrowError();
  });
    

});
