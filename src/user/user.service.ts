import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity} from './entities/user.entity';
import { createPasswordHash } from '../utils/bcrypt-password';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { ReturUserDto } from './dtos/return-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      ) {}

    async createUser(dto: CreateUserDto): Promise<UserEntity> {
        const passwordHash = await createPasswordHash(dto.password);

        const user ={
            ...dto,
            password: passwordHash,
            type_user: UserType.User,
        }

        return this.userRepository.save(user);
    }

    async getAllUser(): Promise<ReturUserDto[]>{
        return (await this.userRepository.find()).map(
            (userEntity)=> new ReturUserDto(userEntity));
    }

    async findUserById(userId: number): Promise<UserEntity>{
        const user = await this.userRepository.findOne({where: {id: userId}});

        if(!user){
            throw new NotFoundException(`userId: ${userId} Not Found`);
        }

        return user;
    }
}


