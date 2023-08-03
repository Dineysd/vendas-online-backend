import { CityEntityMock } from "../../city/__mocks__/city.mock";
import { CreateAddressDto } from "../dtos/create-address.dto";

export const CreateAddressMock: CreateAddressDto = {
    complement: "Casa",
    numberAddress: 733,
    cep: "87035-626",
    cityId: CityEntityMock.id
}