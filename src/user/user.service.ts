import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity} from './entities/user.entity';
import { createPasswordHash } from '../utils/bcrypt-password';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      ) {}

    async createUser(dto: CreateUserDto): Promise<UserEntity> {
        const passwordHash = await createPasswordHash(dto.password);

        const user: UserEntity ={
            ...dto,
            password: passwordHash,
        }

        //this.users.push(user)
        console.log(passwordHash)
        return this.userRepository.save(user);
    }

    async getAllUser(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }
}


