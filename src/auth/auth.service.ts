import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { validatePassword } from '../utils/bcrypt-password';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}
    async login(dto: LoginDto): Promise<UserEntity>{
        const user: UserEntity | undefined =  await this.userService.findUserByEmail(dto.email)
        .catch(()=> undefined );
        const valid = await validatePassword(dto.password,user?.password || '');
        
        if(!user || !valid) throw new NotFoundException('Email or password invalid!')

        return user;
    }
}
