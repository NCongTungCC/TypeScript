import { IsEmpty, IsNotEmpty } from "class-validator";
import { Column, Entity, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Borrow } from "./borrow.entity";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty({ message: 'Title should not be empty' })
    title!: string;

    @Column()
    @IsNotEmpty({ message: 'Author should not be empty' })
    author!: string;

    @Column()
    @IsNotEmpty({ message: 'Poster should not be empty' })
    poster!: string;

    @Column()
    @IsNotEmpty({ message: 'Year should not be empty' })
    year!: number;

    @Column()
    @IsNotEmpty({ message: 'Genre should not be empty' })
    genre!: string;

    @Column()
    @IsNotEmpty({ message: 'Description should not be empty' })
    description!: string;

    @Column()
    totalBooks!: number;

    @Column()
    availableBooks!: number;

    @Column()
    borrowedBooks!: number;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @OneToMany(() => Borrow, (borrow) => borrow.bookId)
    borrows!: Borrow[];
}
