import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";
import { userEntityMock } from "../__mocks__/user.mock";
import { createUserMock } from "../__mocks__/create-user.mock";
import { UpdatePasswordMock } from "../__mocks__/update-user.mock";
import { UserType } from "../enums/user-type.enum";
import { ReturnUserDto } from "../dto/return-user.dto";

describe('UserController', () => {
    let controller: UserController;
    let userService: UserService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: UserService,
            useValue: {
              createUser: jest.fn().mockResolvedValue(userEntityMock),
              updatePasswordUser: jest.fn().mockResolvedValue(userEntityMock),
              getUserByIdUsingRelations: jest
                .fn()
                .mockResolvedValue(userEntityMock),
              getAllUser: jest.fn().mockResolvedValue([userEntityMock]),
            },
          },
        ],
        controllers: [UserController],
      }).compile();
  
      controller = module.get<UserController>(UserController);
      userService = module.get<UserService>(UserService);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(userService).toBeDefined();
    });

    it('should return user Entity in createUser', async () => {
      const user = await controller.createUser(createUserMock);
  
      expect(user).toEqual(userEntityMock);
    });

    it('should return user Entity in createUser', async () => {
      const spy = jest.spyOn(userService, 'createUser');
      const user = await controller.createAdmin(createUserMock);
  
      expect(user).toEqual(userEntityMock);
      expect(spy.mock.calls[0][1]).toEqual(UserType.Admin);
    });
  
    it('should return ReturnUser in getAllUser', async () => {
      const users = await controller.getAll();
  
      expect(users).toEqual([userEntityMock
      ]);
    });
  
    it('should return ReturnUser in getUserById', async () => {
      const user = await controller.getUserById(userEntityMock.id);
  
      expect(user).toEqual({
        id: userEntityMock.id,
        name: userEntityMock.name,
        email: userEntityMock.email,
        phone: userEntityMock.phone,
        cpf: userEntityMock.cpf,
      });
    });
  
    it('should return UserEntity in updatePasswordUser', async () => {
      const user = await controller.updatePassWord(
        UpdatePasswordMock,
        userEntityMock.id,
      );
  
      expect(user).toEqual(userEntityMock);
    });
  
    // it('should return ReturnUserEntity in getInfoUser', async () => {
    //   const user = await controller.getInfoUser(userEntityMock.id);
  
    //   expect(user).toEqual(new ReturnUserDto(userEntityMock));
    // });
    
});