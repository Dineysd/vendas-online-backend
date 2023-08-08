import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateProductDto  {
  @ApiProperty()
  @IsNumber()
  categoryId: number;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()  
  @IsString()
  image: string;
}
