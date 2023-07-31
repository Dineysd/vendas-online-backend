import { ReturnUserDto } from "../../user/dtos/return-user.dto";

export interface ReturnLogin {
    
    user: ReturnUserDto;
    accessToken: string
}