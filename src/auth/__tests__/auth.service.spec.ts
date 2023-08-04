import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { userEntityMock } from "../../user/__mocks__/user.mock";
import { UserService } from "../../user/user.service";
import { AuthService } from "../auth.service";
import { jwtMock } from "../__mocks__/jwt.mock";
import { LoginUserMock } from "../__mocks__/login-user.mock";
import { ReturnUserDto } from "../../user/dtos/return-user.dto";

describe('AuthService', () => {
    let service: AuthService;
    let userService: UserService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          {
            provide: UserService,
            useValue: {
              findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
            },
          },
          {
            provide: JwtService,
            useValue: {
              sign: () => jwtMock,
            },
          },
        ],
      }).compile();
  
      service = module.get<AuthService>(AuthService);
      userService = module.get<UserService>(UserService);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(userService).toBeDefined();
    });

    it('should return user if password and email valid', async () => {
        const user = await service.login(LoginUserMock);

        expect(user).toEqual({
            accessToken: jwtMock,
            user: new ReturnUserDto(userEntityMock),
        })

      });

      it('should return user if password invalid and email valid', async () => {
        expect(
          service.login({ ...LoginUserMock, password: '4324' }),
        ).rejects.toThrowError();
      });
    
      it('should return user if email not exist', async () => {
        jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);
    
        expect(service.login(LoginUserMock)).rejects.toThrowError();
      });
    
      it('should return error in UserService', async () => {
        jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error());
    
        expect(service.login(LoginUserMock)).rejects.toThrowError();
      });

});