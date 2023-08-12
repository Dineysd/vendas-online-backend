import { Body, Controller,  Get,  Param,  Patch,  Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dto/return-user.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from './enums/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';
import { UpdatePasswordDto } from './dto/update-password.mock';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly service: UserService){}

    @Roles(UserType.Root)
    @Post('/admin')
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({
        description: 'Admin User Created Successfully!',
        type: UserEntity,
    })
    @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    async createAdmin(@Body() createUser: CreateUserDto): Promise<UserEntity> {
      return this.service.createUser(createUser, UserType.Admin);
    }

    @UsePipes(ValidationPipe)
    @Post()
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({
        description: 'User Created Successfully!',
        type: UserEntity,
    })
    @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    async createUser(@Body() dto: CreateUserDto): Promise<UserEntity>{
        return this.service.createUser({...dto})
    }

    @Roles(UserType.Admin, UserType.User)
    @UsePipes(ValidationPipe)
    @Patch()
    @ApiBody({ type: UpdatePasswordDto })
    @ApiCreatedResponse({
        description: 'User password updated successfully!',
        type: UserEntity,
    })
    @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    async updatePassWord(@Body() dto: UpdatePasswordDto, @UserId() id: number): Promise<UserEntity>{
        return this.service.updatePasswordUser(id, dto)
    }

    @Roles(UserType.Admin)
    @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    @ApiResponse({
        description: 'return of User data!',
        status: 200,
        type: ReturnUserDto,
    })
    @Get()
    async getAll(): Promise<ReturnUserDto[]> {
        return this.service.getAllUser();
    }
    @Roles(UserType.Admin)
    @Get('/:userId')
    @ApiResponse({
        description: 'return of User data by id!',
        status: 200,
        type: ReturnUserDto,
    })
    @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
        return new ReturnUserDto(
            await this.service.getUserByIdUsingRelations(userId)
            );
    }
}
