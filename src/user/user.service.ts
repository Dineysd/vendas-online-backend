import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity} from './entities/user.entity';
import { createPasswordHash } from '../utils/bcrypt-password';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { ReturnUserDto } from './dtos/return-user.dto';

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

    async getAllUser(): Promise<ReturnUserDto[]>{
        return (await this.userRepository.find()).map(
            (userEntity)=> new ReturnUserDto(userEntity));
    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity>{
        return this.userRepository.findOne({
            where: {
              id: userId,
            },
            relations: {
              addresses: {
                city: {
                  state: true,
                },
              },
            },
          });
    }

    async findUserById(userId: number): Promise<UserEntity>{
        const user = await this.userRepository.findOne({where: {id: userId}});

        if(!user){
            throw new NotFoundException(`userId: ${userId} Not Found`);
        }

        return user;
    }
}


