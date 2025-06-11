import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsNotEmpty, Length, IsEnum, Matches } from 'class-validator';
import {Role, Gender} from '../helpers/constants.helper';

@Entity()
export class User extends BaseEntity {
      @PrimaryGeneratedColumn()
      id!: number;

      @Column()
      @IsNotEmpty({message : 'Name must not be empty'})
      @Length(5, 20, {message : 'Name must be between 5 and 20 characters'})
      username!: string;

      @Column({ unique: true })
      @IsNotEmpty({message : 'Email must not be empty'})
      @Matches(/^[\w-\.]+@gmail\.com$/, {
            message: 'Email must be in the correct format (e.g., example@gmail.com)'
      })
      email!: string;

      @Column()
      @IsNotEmpty({message : 'Password must not be empty'})
      @Length(6, 20, {message : 'Password must be between 6 and 20 characters'})
      password!: string;

      @Column({ type: 'enum', enum : Role})
      role!: string;

      @Column({ nullable: true })
      avatar!: string;

      @Column({ type: 'enum', enum : Gender})
      @IsEnum(Gender, {message : 'Invalid gender'})
      @IsNotEmpty({message : 'Gender must not be empty'})
      gender!: Gender;

      @Column()
      @IsNotEmpty({message : 'Birthday must not be empty'})
      birthday!: Date;
}