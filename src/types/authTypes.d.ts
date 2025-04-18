 export interface User {
     usuario_id : number,
     nombre : string,
     email : string,
     password : string
 }



 export type AuthSinId = Omit<User,'usuario_id'>
 export type AuthConEmail = Omit<User, 'usuario_id' | 'nombre' | 'password'>;