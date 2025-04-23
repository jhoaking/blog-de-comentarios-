
 
 export interface AuthType{
     usuario_id : number,
     nombre : string,
     email : string,
     password : string
 }


 export type Register = Pick<AuthType,'nombre' |  'email' | 'password'>
