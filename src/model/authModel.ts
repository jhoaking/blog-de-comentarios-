import { ResultSetHeader,RowDataPacket } from 'mysql2';
import {connection} from '../db';
import { AuthType,Register } from '../types/authTypes';



export  class auhModel{
    static register = async (data:Register):Promise<AuthType> =>{
        try {
            const query = 'INSERT INTO usuarios(nombre,email,password) VALUES(?,?,?)';
            const values = [data.nombre,data.email,data.password];
            const [rows] = await connection.query<ResultSetHeader>(query,values);
            return {usuario_id : rows.insertId , ...data}
        } catch (error: any) {
            throw new Error("error al registrar en la db");
        }
    }

    static getByEmail = async (email : string):Promise<AuthType | null> =>{
        try {
            const query = 'SELECT * FROM usuarios WHERE email = ?';
            const [rows] = await connection.query<RowDataPacket[]>(query,[email]);
            if(rows.length === 0){
                return null;
            }

            return rows[0] as AuthType;
        } catch (error: any) {
            throw new Error("error al buscar el email en la db");
        }
    }
}