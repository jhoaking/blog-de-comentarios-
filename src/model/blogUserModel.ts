import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../db";
import {
  BlogUserType,
  blogUserTypeFront,
  CreateBlogUser,
  UpdateBlogUser,
} from "../types/blogUser";

export class blogUserModel {
  static getBlogUser = async (id: number): Promise<BlogUserType[]> => {
    try {
      const query = `SELECT u.nombre , b.titulo , b.contenido , b.fecha_publicacion  FROM blogs b
	                  INNER JOIN usuarios u ON  b.usuario_id = u.usuario_id
	                  WHERE u.usuario_id = ?`;
      const [rows] = await connection.query(query, [id]);

      return rows as BlogUserType[];
    } catch (error: any) {
      console.log(error.message);
      throw new Error("error al obtener los blogs del usuario");
      
    }
  };

  static getBlogUserById = async (
    blog_id: number,
    id: number
  ): Promise<BlogUserType[]> => {
    try {
      const query = "SELECT * FROM blogs WHERE  blog_id = ? AND usuario_id = ?";
      const [rows] = await connection.query<RowDataPacket[]>(query, [
        blog_id,
        id,
      ]);
      if (rows.length === 0) {
        throw new Error("no se encontro el usuario");
      }
      return rows as BlogUserType[];
    } catch (error: any) {
      throw new Error("error al obtener el blog del usuario");
    }
  };

  static createBlogUser = async (
    data: CreateBlogUser,
    usuario_id : number
  ): Promise<blogUserTypeFront> => {
    try {
      const query =
        "INSERT INTO blogs(titulo , contenido , fecha_publicacion, usuario_id )VALUES(?,?,?,?)";
      const values = [data.titulo, data.contenido, data.fecha_publicacion,usuario_id];

      const [rows] = await connection.query<ResultSetHeader>(query, values);

      return { blog_id: rows.insertId, ...data };
    } catch (error: any) {
      throw new Error("error al crear el blog del usuario");
    }
  };

  static deleteBlogUser = async (blog_id: number , usuario_id : number): Promise<boolean> => {
    const query = "DELETE FROM blogs WHERE blog_id = ? AND usuario_id = ?";
    const [result] = await connection.query<ResultSetHeader>(query, [blog_id,usuario_id]);
    return result.affectedRows > 0;
  };

  static updateBlogUser = async (
    data: UpdateBlogUser,
    blog_id: number,
    usuario_id: number
  ): Promise<boolean> => {
    const query =
      "UPDATE blogs SET titulo = ?, contenido = ? ,fecha_publicacion = ? WHERE blog_id = ? AND usuario_id = ? ";
    const values = [
      data.titulo,
      data.contenido,
      data.fecha_publicacion,
      blog_id,
      usuario_id,
    ];

    const [rows] = await connection.query<ResultSetHeader>(query, values);
    return rows.affectedRows > 0;
  };
}
