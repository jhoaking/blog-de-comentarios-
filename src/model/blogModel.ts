import { ResultSetHeader } from 'mysql2';
import {connection} from '../db'
import { Blogs, BlogSinId } from '../types/blogsTypes'
 

export class blogUsuarioModel {
    static obtenerBlogUsuario = async (usuario_id :number): Promise<Blogs[]> =>{
        try {
            const query = 'SELECT * FROM blogs WHERE usuario_id = ?';
            const  [rows] = await connection.query(query,[usuario_id]);
            return rows as Blogs[];
        } catch (error: any) {
            throw new Error(`error at get blog at a user in the db: ${error.message}`);
        }
    }

    static crearBlogUsuario = async (data : BlogSinId, usuario_id : number) : Promise<Blogs> =>{
        try {
            const query = 'INSERT INTO blogs(titulo,contenido,fecha_publicacion,usuario_id) VALUES(?,?,?,?)';
            const values = [data.titulo,data.contenido,data.fecha_publicacion,usuario_id];

            const [rows]  =await connection.query<ResultSetHeader>(query,values);
            return {blog_id : rows.insertId , ...data, usuario_id};
        } catch (error : any) {
            throw new Error(`error at create blog at a user in the db: ${error.message}`);
        }
    }
    static eliminarlogUsuario = async(usuario_id : number , blog_id : number,data : BlogSinId): Promise<boolean> =>{
        try {
            const query = 'DELETE FROM blogs WHERE usuario_id = ? AND blog_id = ?';
            const values = [data.titulo,data.contenido,data.fecha_publicacion,usuario_id,blog_id];
            const [rows] = await connection.query<ResultSetHeader>(query,values);
            return rows.affectedRows === 1;
        } catch (error : any) {
            throw new Error(`error at delete blog at a user in the db: ${error.message}`);
        }
    }

    static actualizarBolgUsuario = async (usuario_id: number , data : BlogSinId) : Promise<boolean> =>{
        try {
            const query = 'UPDATE blogs SET titulo = ?, contenido = ?,fecha_publicacion = ? WHERE blog_id = ? AND usuario_id = ?';
            const values = [data.titulo,data.contenido,data.fecha_publicacion,usuario_id];
            const [rows] = await connection.query<ResultSetHeader>(query,values);
            return rows.affectedRows === 1;
        } catch (error : any) {
            throw new Error(`error at update blog at a user in the db: ${error.message}`);
        }
    }
}