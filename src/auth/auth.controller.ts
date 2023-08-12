import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { ReturnUserDto } from '../user/dto/return-user.dto';
import { AuthService } from './auth.service';
import { ReturnLogin } from './dtos/return-login.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService){}
    @ApiBody({ type: LoginDto })
    @ApiCreatedResponse({
        description: 'Usuário Criado com Sucesso!',
        type: ReturnLogin,
      })
    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body()dto: LoginDto): Promise<ReturnLogin> {
       return this.service.login(dto)
    }
}
