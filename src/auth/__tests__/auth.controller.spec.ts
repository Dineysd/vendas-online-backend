import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { returnLoginMock } from "../__mocks__/return-login.mock";
import { LoginUserMock } from "../__mocks__/login-user.mock";

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AuthService,
            useValue: {
              login: jest.fn().mockResolvedValue(returnLoginMock),
            },
          },
        ],
        controllers: [AuthController],
      }).compile();
  
      controller = module.get<AuthController>(AuthController);
      authService = module.get<AuthService>(AuthService);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(authService).toBeDefined();
    });

    it('shound return login', async ()=>{
      const returnLogin = await controller.login(LoginUserMock)

      expect(returnLogin).toEqual(returnLoginMock)
    })
    
});