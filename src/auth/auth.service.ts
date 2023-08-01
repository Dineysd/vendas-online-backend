import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { validatePassword } from '../utils/bcrypt-password';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dtos/return-login.dto';
import { ReturnUserDto } from '../user/dtos/return-user.dto';
import { LoginPayload } from './dtos/login-payload.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private jwtService: JwtService){}
    async login(dto: LoginDto): Promise<ReturnLogin>{
        const user: UserEntity | undefined =  await this.userService.findUserByEmail(dto.email)
        .catch(()=> undefined );
        const valid = await validatePassword(dto.password,user?.password || '');
        
        if(!user || !valid) throw new NotFoundException('Email or password invalid!')

        return { accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
             user: new ReturnUserDto(user)};
    }
}
