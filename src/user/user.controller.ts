import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    async getAll(){
        return JSON.stringify({test: "teste"})
    }
}