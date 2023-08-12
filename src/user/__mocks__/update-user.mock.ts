import { UpdatePasswordDto } from "../dto/update-password.dto";

export const UpdatePasswordMock: UpdatePasswordDto ={
    newPassword: "adc",
    lastPassword: "abc"
}

export const UpdatePasswordInvalidMock: UpdatePasswordDto ={
    newPassword: "adc",
    lastPassword: "wew"
}