import { AuthService } from '../service/authService';
import {connection} from '../db';
import {  AuthSinId, User } from '../types/authTypes';
import { ResultSetHeader,RowDataPacket } from 'mysql2';


export class authModel {
    static registerUser = async (data : AuthSinId) : Promise<User> =>{
        try {
            const hashingPassword = await AuthService.hashedPassword(data.password);
            const query = 'INSERT INTO usuarios(nombre,email,password) VALUES(?,?,?)';

            const values = [data.nombre,data.email,hashingPassword];

            const  [rows] = await connection.query<ResultSetHeader>(query , values);

            return { usuario_id: rows.insertId, ...data };
        } catch (error : any) {
            throw new Error(`Error to register a user: ${error.message}`);
        }
    }


    static getByEmail = async (email : string) : Promise<User | null> =>{
        try {
            const query = 'SELECT * FROM usuarios WHERE email = ?';
            const [rows] = await connection.query<RowDataPacket[]>(query,[email]);
             if(rows.length === 0){
                return null;
             }
             return rows[0] as User;
        } catch (error : any) {
            throw new Error(`error at get email at a user: ${error.message}`);
        }
    }

}