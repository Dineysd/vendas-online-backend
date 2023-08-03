import { CityEntity } from "../entities/city.entity";
import { StateEntityMock } from '../../state/__mocks__/state.mock';

export const CityEntityMock: CityEntity = {
    createdAt: new Date(),
    id: 6543543,
    name: 'cityName',
    stateId: StateEntityMock.id,
    updatedAt: new Date(),
  };