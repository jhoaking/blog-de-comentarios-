import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SALT_ROUNDS,SECRET_JWT_KEY } from '../config';
import { AuthType} from '../types/authTypes';

export class AuthService {
    static createToken = async (user: AuthType): Promise<string>  =>{
        try {
            const token  = jwt.sign(
                {id: user.usuario_id , nombre : user.nombre, email : user.email},
                SECRET_JWT_KEY,
                {expiresIn : "24h"})
             return token;   
        } catch (error : any) {
            throw new Error(`Error generating token: ${error.message}`);
        }
    }

    static hashedPassword  = async (password : string) : Promise<string> =>{
        try {
            const  passwordHashed = await bcrypt.hash(password,SALT_ROUNDS);
            return  passwordHashed;
        } catch (error : any) {
            throw new Error(`Error hashing password: ${error.message}`);
        }
    }

    static comparePassword = async ( password: string,hashedPassword: string) : Promise<boolean> =>{
        try {
            const compare = await  bcrypt.compare(password,hashedPassword) ; 
            return compare;
        } catch (error : any) {
            throw new Error(`Error comparing password: ${error.message}`);
        }
    }


    static  verifyToken = (token: string): string | JwtPayload => {
        try {
          return jwt.verify(token, SECRET_JWT_KEY);
        } catch (error: any) {
          throw new Error(`Error verifying token: ${error.message}`);
        }
      };
}