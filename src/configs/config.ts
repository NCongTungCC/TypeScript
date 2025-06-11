import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Token } from '../entities/token.entity';
import { Book } from '../entities/book.entity';
import { Borrow } from '../entities/borrow.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'your_db_name',
        synchronize: true,
        logging: false,
        entities: [User, Token, Book, Borrow],
        migrations: [],
        subscribers: [],
});