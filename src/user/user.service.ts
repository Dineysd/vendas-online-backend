import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { createPasswordHash } from 'src/utils/bcrypt-password';

@Injectable()
export class UserService {
    private users : UserEntity[] = [];

    async createUser(dto: CreateUserDto): Promise<UserEntity> {
        const passwordHash = await createPasswordHash(dto.password);

        const user: UserEntity ={
            ...dto, 
            id: this.users.length + 1,
             password : passwordHash }

        this.users.push(user)
        console.log(passwordHash)
        return user
    }

    async getAllUser(): Promise<UserEntity[]>{
        return this.users
    }
}
