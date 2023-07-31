import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { ReturnUserDto } from '../user/dtos/return-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService){}
    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body()dto: LoginDto): Promise<ReturnUserDto> {
       return new ReturnUserDto(await this.service.login(dto))
    }
}
