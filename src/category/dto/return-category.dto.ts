import { ApiProperty } from "@nestjs/swagger";
import { CategoryEntity } from "../entities/category.entity";

export class ReturnCategory {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
  
    constructor(categoryEntity: CategoryEntity) {
      this.id = categoryEntity.id;
      this.name = categoryEntity.name;
    }
  }