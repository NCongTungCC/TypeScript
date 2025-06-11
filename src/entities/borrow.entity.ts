import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { IsInt, IsDate, IsString, IsIn, IsOptional } from "class-validator";
import { Status } from "../helpers/constants.helper";

@Entity()
export class Borrow extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsInt()
    userId!: number;

    @Column()
    @IsInt()
    bookId!: number;

    @Column()
    @IsDate()
    borrowDate!: Date;

    @Column()
    @IsDate()
    returnDate!: Date;

    @Column()
    @IsDate()
    dueDate!: Date;

    @Column({ type: 'enum', enum : Status})
    @IsString()
    status!: string;

    @CreateDateColumn()
    @IsOptional()
    createdAt?: Date;
        
    @UpdateDateColumn()
    @IsOptional()
    updatedAt?: Date;
}
