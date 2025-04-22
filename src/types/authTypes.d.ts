
 
 export interface AuthType{
     usuario_id : number,
     nombre : string,
     email : string,
     password : string
 }


 export type register = pick<AuthType,'nombre' |  'email' | 'password'>
