import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../db";
import { ComentarioType, CreateComentarioBlog } from "../types/comentarioTypes";

export class comentarioModel {
  static verComentariosBlog = async (
    blog_id: number
  ): Promise<ComentarioType[]> => {
    try {
      const query = "SELECT * FROM comentarios WHERE blog_id = ? ";
      const [rows] = await connection.query(query, [blog_id]);
      return rows as ComentarioType[];
    } catch (error: any) {
      console.log(error.message);
      throw new Error("error al obtener el comentario del usuario");
    }
  };

  static createComentario = async (
    data: CreateComentarioBlog,
    blog_id: number,
    usuario_id: number
  ): Promise<ComentarioType> => {
    try {
      const query =
        "INSERT INTO comentarios(contenido,fecha_publicacion,blog_id , usuario_id) VALUES(?,?,?,?)";
      const values = [
        data.contenido,
        data.fecha_publicacion,
        blog_id,
        usuario_id,
      ];
      const [rows] = await connection.query<ResultSetHeader>(query, values);
      return {
        comentario_id: rows.insertId,
        blog_id,
        usuario_id,
        ...data,
      } as ComentarioType;
    } catch (error: any) {
      console.log(error.message);
      throw new Error("error al crear el comentario del usuario");
    }
  };

  static deleteComentario = async (
    comentario_id: number,
    usuario_id: number
  ): Promise<ComentarioType[] | null> => {
    try {
      const comentario = await this.getComentarioBydId(
        comentario_id,
        usuario_id
      );
      if (!comentario) {
        throw new Error("Comentario no encontrado o no es tu comentario");
      }

      const query =
        "DELETE FROM comentarios WHERE comentario_id = ?  AND usuario_id = ?";
      const [rows] = await connection.query<ResultSetHeader>(query, [
        comentario_id,
        usuario_id,
      ]);
      if (rows.affectedRows > 0) {
        return comentario;
      } else {
        throw new Error("No se pudo eliminar el comentario");
      }
    } catch (error: any) {
      console.log(error.message);
      throw new Error("error al eliminar el comentario del usuario");
    }
  };

  static getComentarioBydId = async (
    comentario_id: number,
    usuario_id: number
  ): Promise<ComentarioType[] | null> => {
    const query =
      "SELECT * FROM comentarios WHERE comentario_id = ? AND usuario_id = ?";
    const [rows] = await connection.query<RowDataPacket[]>(query, [
      comentario_id,
      usuario_id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as ComentarioType[] | null;
  };
}
