import { userEntityMock } from "../../user/__mocks__/user.mock";
import { LoginDto } from "../dtos/login.dto";

export const LoginUserMock: LoginDto = {
    email: userEntityMock.email,
    password: "9281928"
}