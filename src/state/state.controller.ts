import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
    constructor(private readonly service: StateService){}

    @Get()
    async getAll(){
        return await this.service.getAllState();
    }
}
