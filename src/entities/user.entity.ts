import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsNotEmpty, Length, IsEnum, Matches } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user'
}

@Entity()
export class User extends BaseEntity {
        @PrimaryGeneratedColumn()
        id!: number;

        @Column()
        @IsNotEmpty({message : 'Tên không được để trống'})
        @Length(5, 20, {message : 'Tên phải có độ dài từ 5 đến 20 ký tự'})
        username!: string;

        @Column({ unique: true })
        @IsNotEmpty({message : 'Email không được để trống'})
        @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
          message: 'Email phải đúng định dạng (ví dụ: example@gmail.com)'
        })
        email!: string;

        @Column()
        @IsNotEmpty({message : 'Mật khẩu không được để trống'})
        @Length(6, 20, {message : 'Mật khẩu phải có độ dài từ 6 đến 20 ký tự'})
        password!: string;

        @Column({ type: 'enum', enum : Role})
        role!: string;

        @Column()
        avatar!: string;

        @Column({ type: 'enum', enum : Gender})
        @IsEnum(Gender, {message : 'Giới tính không hợp lệ'})
        @IsNotEmpty({message : 'Giới tính không được để trống'})
        gender!: Gender;

        @Column()
        @IsNotEmpty({message : 'Ngày sinh không được để trống'})
        birthday!: Date;
}