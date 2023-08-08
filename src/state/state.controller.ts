import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { StateEntity } from './entities/state.entity';
import { StateService } from './state.service';

@ApiTags('State')
@Controller('state')
@ApiBearerAuth()
export class StateController {
    constructor(private readonly service: StateService){}
    @ApiUnauthorizedResponse({ description: 'Not authorized!' })
    @ApiResponse({
        description: 'return of state data!!',
        status: 200,
        type: [StateEntity],
    })
    @Get()
    async getAll(){
        return await this.service.getAllState();
    }
}
