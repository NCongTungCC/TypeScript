import jwt from 'jsonwebtoken';
import { UserInterface } from '../interfaces/user.interface';
import * as dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET_KEY || 'key';

export const generateToken = (user: UserInterface) => {
    const token = jwt.sign({ id: user.id, role : user.role }, secret, {
        expiresIn: 30 * 60,
    });
    return { token, expiresIn: 30 * 60 };
};