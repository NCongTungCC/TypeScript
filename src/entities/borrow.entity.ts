import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,ManyToOne, UpdateDateColumn, BaseEntity } from "typeorm";
import { IsInt, IsDate, IsString, IsOptional } from "class-validator";
import { Status } from "../helpers/constants.helper";
import { User } from "./user.entity";
import { Book } from "./book.entity";

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

    @Column({default: null, nullable: true})
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

    @ManyToOne(() => User, (user) => user.borrows, { onDelete: 'CASCADE' })
    user!: User;

    @ManyToOne(() => Book, (book) => book.borrows, { onDelete: 'CASCADE' })
    book!: Book;
}
