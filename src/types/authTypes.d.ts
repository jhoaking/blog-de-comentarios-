 export interface User {
     usuario_id : number,
     nombre : string,
     email : string,
     password : string
 }

 export interface AuhtUser{
    user : User,
    token : string
 }

 export interface tokenPayload {
    usuario_id : number,
    nombre : string,
    email : string,

 }

 export type AuthSinId = Omit<User,'usuario_id'>
 export type AuthLogin = Pick<User,'email' | 'password'>;