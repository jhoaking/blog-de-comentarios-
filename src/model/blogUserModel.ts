import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../db";
import { BlogUserType, CreateBlogUser, UpdateBlogUser } from "../types/blogUser";
import { number } from "zod";

export class blogUserModel {
  static getBlogUser = async (id: number): Promise<BlogUserType[]> => {
    try {
      const query = "SELECT  * FROM blogs WHERE usuario_id = ?";
      const [rows] = await connection.query(query, [id]);

      return rows as BlogUserType[];
    } catch (error: any) {
      throw new Error("error al obtener los blogs del usuario");
    }
  };

  static getBlogUserById = async (id: number): Promise<BlogUserType[]> => {
    try {
      const query = "SELECT * FROM blogs WHERE usuario_id = ?";
      const [rows] = await connection.query<RowDataPacket[]>(query, [id]);
      if (rows.length === 0) {
        throw new Error("no se encontro el usuario");
      }
      return rows as BlogUserType[];
    } catch (error: any) {
      throw new Error("error al obtener el blog del usuario");
    }
  };

  static createBlogUser = async (
    data: CreateBlogUser
  ): Promise<BlogUserType> => {
    try {
      const query =
        "INSERT INTO blogs(titulo , contenido , fecha_publicacion )";
      const values = [data.titulo, data.contenido, data.fecha_publicacion];

      const [rows] = await connection.query<ResultSetHeader>(query, values);

      return { blog_id: rows.insertId, ...data };
    } catch (error: any) {
      throw new Error("error al crear el blog del usuario");
    }
  };

  static deleteBlogUser = async (blog_id: number): Promise<boolean> => {
    const query = "DELETE FROM blogs WHERE blog_id = ?";
    const [result] = await connection.query<ResultSetHeader>(query, [blog_id]);
    return result.affectedRows > 0;
  };

  static updateBlogUser = async (data : UpdateBlogUser , blog_id : number, usuario_id : number):Promise<boolean> =>{
     const query = 'UPDATE blogs SET titulo = ?, contenido = ? WHERE blog_id = ? AND usuario_id = ? ';
     const values = [data.titulo,data.contenido,data.fecha_publicacion , blog_id,usuario_id];

     const [rows] = await connection.query<ResultSetHeader>(query,values);
     return rows.affectedRows > 0;
  }
}
