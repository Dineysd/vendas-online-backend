import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity} from './entities/user.entity';
import { createPasswordHash } from '../utils/bcrypt-password';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enums/user-type.enum';
import { ReturnUserDto } from './dtos/return-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      ) {}

    async createUser(dto: CreateUserDto,
      userType?: number,
    ): Promise<UserEntity> {

      const user = await this.findUserByEmail(dto.email).catch(
        () => undefined,
      );
  
      if (user) {
        throw new BadGatewayException('email registered in system');
      }
        const passwordHash = await createPasswordHash(dto.password);

        const userSave ={
            ...dto,
            password: passwordHash,
            type_user: userType? userType: UserType.User,
        }

        return this.userRepository.save(userSave);
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

    async findUserByEmail(email: string): Promise<UserEntity>{
      const user = await this.userRepository.findOne({where: {email}});

      if(!user){
          throw new NotFoundException(`email: ${email} Not Found`);
      }

      return user;
  }
}


