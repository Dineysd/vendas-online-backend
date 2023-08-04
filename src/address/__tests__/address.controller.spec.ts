import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { AddressController } from '../address.controller';
import { AddressService } from '../address.service';
import { AddressEntityMock } from '../__mocks__/address.mock';
import { CreateAddressMock } from '../__mocks__/create-address.mock';

describe('AddressController', () => {
  let controller: AddressController;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AddressService,
          useValue: {
            createAddress: jest.fn().mockResolvedValue(AddressEntityMock),
            findAllAddressByUserId: jest.fn().mockResolvedValue([AddressEntityMock]),
          },
        },
      ],
      controllers: [AddressController],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(addressService).toBeDefined();
  });

  it('should address Entity in createAddress', async () => {
    const address = await controller.createAddress(
      CreateAddressMock,
      userEntityMock.id,
    );

    expect(address).toEqual(AddressEntityMock);
  });

  it('should address Entity in findAddressByUserId', async () => {
    const addresses = await controller.findAddressByUserId(userEntityMock.id);

    expect(addresses).toEqual([
      {
        id: AddressEntityMock.id,
        complement: AddressEntityMock.complement,
        numberAddress: AddressEntityMock.numberAddress,
        cep: AddressEntityMock.cep,
      },
    ]);
  });
});