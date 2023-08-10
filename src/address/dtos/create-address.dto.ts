import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  complement: string;
  @ApiProperty()
  @IsInt()
  numberAddress: number;
  @ApiProperty()
  @IsString()
  cep: string;
  @ApiProperty()
  @IsInt()
  cityId: number;

}