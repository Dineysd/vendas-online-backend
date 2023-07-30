import { Body, Controller,  Get,  Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService){}
    @Post()
    async createUser(@Body() dto :CreateUserDto): Promise<UserEntity>{
        return this.service.createUser({...dto})
    }
    @Get()
    async getAll(): Promise<UserEntity[]> {
        return this.service.getAllUser();
    }
}
