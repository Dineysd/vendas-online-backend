import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enums/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '123543543',
  createdAt: new Date(),
  email: 'ricardo@gmail.com',
  id: 43242,
  name: 'nameMock',
  password: '$2b$10$S62WmVpIxL52Z.0y22DWfuaAz8.XUNESChWP.AlMFZnOJ9n9uiqi.',
  phone: '321532523532',
  type_user: UserType.User,
  updatedAt: new Date(),
};