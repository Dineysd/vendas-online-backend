import { Body, Controller,  Get,  Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturUserDto } from './dtos/return-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService){}
    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() dto :CreateUserDto): Promise<UserEntity>{
        return this.service.createUser({...dto})
    }
    @Get()
    async getAll(): Promise<ReturUserDto[]> {
        return this.service.getAllUser();
    }
}
