import { UpdatePasswordDto } from "../dto/update-password.mock";

export const UpdatePasswordMock: UpdatePasswordDto ={
    newPassword: "adc",
    lastPassword: "abc"
}

export const UpdatePasswordInvalidMock: UpdatePasswordDto ={
    newPassword: "adc",
    lastPassword: "wew"
}