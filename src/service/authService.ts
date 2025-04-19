import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authModel } from '../model/authModel';
import { SALT_ROUNDS,SECRET_JWT_KEY } from '../config';
import { User,AuthLogin,AuhtUser,AuthSinId } from '../types/authTypes';

export class AuthService {
    static createToken = async (user: User): Promise<string>  =>{
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

    static loginUser = async (data :AuthLogin) : Promise<AuhtUser> =>{
        try {
            const user = await authModel.getByEmail(data.email);
             if(!user){
                throw new Error("el usuario debe registrarse");
                
             }

             const passwordIsValid = await this.comparePassword(data.password , user.password);
             if(!passwordIsValid){
                throw new Error("contraseña invalida");
             }
             const token = await this.createToken(user);

             return {user,token}
        } catch (error : any ) {
            throw new Error(`Error loging  a user: ${error.message}`);
        }
    }

    static registerUser = async (data : AuthSinId) :Promise <User>=>{
        try {
            const user = await authModel.getByEmail(data.email);
            if(user){
                throw new Error("usuario ya  registrado");
            }
            const newUser = await authModel.registerUser(data)
            
            return newUser;
        } catch (error : any) {
            throw new Error(`Error register a user: ${error.message}`);
        }
    }
}