import { CityEntityMock } from "../../city/__mocks__/city.mock";
import { userEntityMock } from "../../user/__mocks__/user.mock";
import { AddressEntity } from "../entities/address.entity";

export const AddressEntityMock: AddressEntity = {
    user_id: userEntityMock.id,
    complement: 'Casa',
    numberAddress: 733,
    cep: '87035-626',
    cityId: CityEntityMock.id,
    id: 111,
    createdAt: new Date(),
    updatedAt: new Date()
};