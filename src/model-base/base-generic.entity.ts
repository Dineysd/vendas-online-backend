import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseGeneric{
    @ApiProperty()
    @PrimaryGeneratedColumn('rowid')
    id: number;
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}