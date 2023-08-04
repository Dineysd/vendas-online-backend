import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enums/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '123543543',
  createdAt: new Date(),
  email: 'ricardo@gmail.com',
  id: 43242,
  name: 'nameMock',
  password: '$2b$10$W9lg3xtOVRHJvIu1UztOAucAU0u7voPsibIpowAVnMe2A2ryZyNEm',
  phone: '321532523532',
  type_user: UserType.User,
  updatedAt: new Date(),
};