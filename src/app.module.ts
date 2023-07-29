import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [UserModule, 
    ConfigModule.forRoot({ isGlobal: true,
    envFilePath: '.development.env',
  }), 
  TypeOrmModule.forRoot({
    type: 'postgres',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    entities: [`${__dirname}/**/*.entity{.js,*.ts}`],
    migrations: [`${__dirname}/migration/{.ts,*.js}`],
    migrationsRun: true,
    synchronize: true,
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
