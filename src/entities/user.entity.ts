import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsEmail, IsNotEmpty, Length, IsEnum } from 'class-validator';
export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
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
        @IsEmail({}, {message : 'Email không hợp lệ'})
        @IsNotEmpty({message : 'Email không được để trống'})
        email!: string;

        @Column()
        @IsNotEmpty({message : 'Mật khẩu không được để trống'})
        @Length(6, 20, {message : 'Mật khẩu phải có độ dài từ 6 đến 20 ký tự'})
        password!: string;

        @Column()
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