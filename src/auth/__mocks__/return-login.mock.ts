import { userEntityMock } from "../../user/__mocks__/user.mock";
import { ReturnLogin } from "../dtos/return-login.dto";
import { jwtMock } from "./jwt.mock";

export const returnLoginMock: ReturnLogin = {
    accessToken: jwtMock,
    user: userEntityMock,
  };