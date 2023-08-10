import { ApiProperty } from '@nestjs/swagger';
import { StateEntity } from '../entities/state.entity';

export class ReturnStateDto {
  @ApiProperty()
  name: string;

  constructor(state: StateEntity) {
    this.name = state.name;
  }
}