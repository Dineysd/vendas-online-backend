import { Test, TestingModule } from "@nestjs/testing";
import { UserEntity } from "../entities/user.entity";
import { UserService } from "../user.service"
import {Repository} from "typeorm"
import {getRepositoryToken} from "@nestjs/typeorm"
import { userEntityMock } from "../__mocks__/user.mock";
import { createUserMock } from "../__mocks__/create-user.mock";
import { UserType } from "../enums/user-type.enum";
import { UpdatePasswordInvalidMock, UpdatePasswordMock } from "../__mocks__/update-user.mock";

describe('UserService', ()=>{
    let service: UserService;
    let repository: Repository<UserEntity>

    beforeEach(async ()=> {
        const module: TestingModule = await Test.createTestingModule({
            providers:[UserService, {
                provide: getRepositoryToken(UserEntity),
                useValue: {
                  findOne: jest.fn().mockResolvedValue(userEntityMock),
                  save: jest.fn().mockResolvedValue(userEntityMock),
                },
              },]
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<Repository<UserEntity>>
        (getRepositoryToken(UserEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    })

    it('should return User in findUserByEmail', async () => {
        const user = await service.findUserByEmail(userEntityMock.email);
        expect(user).toEqual(userEntityMock);
    });

    it('should return error in findUserByEmail', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

        expect(
        service.findUserByEmail(userEntityMock.email),
        ).rejects.toThrowError();
    });

    it('should return error in findUserByEmail (error DB)', async () => {
        jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());
    
        expect(
          service.findUserByEmail(userEntityMock.email),
        ).rejects.toThrowError();
      });

    it('should return User in findUserById', async () => {
        const user = await service.findUserById(userEntityMock.id);

        expect(user).toEqual(userEntityMock);
    });

    it('should return error in findUserById', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

        expect(
            service.findUserById(userEntityMock.id),
        ).rejects.toThrowError();
    });

    it('should return error in findUserById (error DB)', async () => {
        jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());
    
        expect(service.findUserById(userEntityMock.id)).rejects.toThrowError();
      });

    it('should return User in getUserByIdUsingRelations', async () => {
        const user = await service.getUserByIdUsingRelations(userEntityMock.id);

        expect(user).toEqual(userEntityMock);
    });

    it('should return error if user exist createUser', async () => {
        expect(service.createUser(createUserMock)).rejects.toThrowError();
      });
    
      it('should return user if user not exist createUser', async () => {
        const spy = jest.spyOn(repository, 'save');
        jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
    
        const user = await service.createUser(createUserMock);
    
        expect(user).toEqual(userEntityMock);
        expect(spy.mock.calls[0][0].type_user).toEqual(UserType.User);
      });

      it('should return update in user', async () => {
        const user = await service.updatePasswordUser(userEntityMock.id,
          UpdatePasswordMock
        );
    
        expect(user).toEqual(userEntityMock);
      });

      it('should return invalid password in error', async () => {
        expect(
          service.updatePasswordUser(userEntityMock.id, UpdatePasswordInvalidMock),
        ).rejects.toThrowError();
      });

      it('should return invalid password in error', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(undefined)

        expect(
          service.updatePasswordUser(userEntityMock.id, UpdatePasswordMock),
        ).rejects.toThrowError();
      });


})