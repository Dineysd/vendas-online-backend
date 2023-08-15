import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../user/entities/user.entity";

export class LoginPayload{
    @ApiProperty()
    id: number;
    @ApiProperty()
    typeUser: number;
    constructor(user: UserEntity){
        this.id = user.id;
        this.typeUser = user.type_user;
    }
}