import { Request } from "express";
import { AuthType } from "./authTypes"; 

export interface RequestConUsuario extends Request {
  user: AuthType;
}
 
 
 export interface AuthType {
     usuario_id : number,
     nombre : string,
     email : string,
     password : string
 }

 export interface AuhtUser{
    user : AuthType,
    token : string
 }


 export type AuthSinId = Omit<AuthType,'usuario_id'>
 export type AuthLogin = Pick<AuthType,'email' | 'password'>;