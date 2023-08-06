import { Body, Controller,  Get,  Param,  Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/return-user.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from './enums/user-type.enum';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService){}

    //@Roles(UserType.Root)
    @Post('/admin')
    async createAdmin(@Body() createUser: CreateUserDto): Promise<UserEntity> {
      return this.service.createUser(createUser, UserType.Admin);
    }

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<UserEntity>{
        return this.service.createUser({...dto})
    }
    //@Roles(UserType.Admin, UserType.Root)
    @Get()
    async getAll(): Promise<ReturnUserDto[]> {
        return this.service.getAllUser();
    }
    @Roles(UserType.Admin, UserType.Root)
    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
        return new ReturnUserDto(
            await this.service.getUserByIdUsingRelations(userId)
            );
    }
}
