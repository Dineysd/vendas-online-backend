import { ApiProperty } from "@nestjs/swagger";
import { ReturnUserDto } from "../../user/dto/return-user.dto";

export class ReturnLogin {
    @ApiProperty()
    user: ReturnUserDto;
    @ApiProperty()
    accessToken: string
}