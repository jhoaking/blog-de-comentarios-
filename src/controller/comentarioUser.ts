import { Request, Response } from "express";
import { comentarioModel } from "../model/comentarioModel";
import { validateComment } from "../schema/comentariosSchema";
import { ComentarioType } from "../types/comentarioTypes";

export class comentarioController {
  static obtenerComentarios = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const blog_id = Number(req.params.blog_id);
    if (blog_id === null) {
      res.status(400).json({ message: "ID vlog no valido" });
      return;
    }
    try {
      const result = await comentarioModel.verComentariosBlog(blog_id);
      if (result.length === 0) {
        res
          .status(404)
          .json({ message: "No se encontraron comentarios para este blog" });
        return;
      }
      res.status(200).json(result);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ message: "Error al obtener los comentarios" });
    }
  };


  static crearComentario = async (req:Request, res: Response) =>{
    try {
      const vali = validateComment(req.body);
      if (!vali.valid) {
        res.status(400).json({ errors: vali.errors });
        return;
      }
      const {contenido,fecha_publicacion,blog_id,usuario_id} = vali.data  as ComentarioType
      const result = await comentarioModel.createComentario({contenido,fecha_publicacion},blog_id,usuario_id)
      
      res.status(201).json(result);
    } catch (error:any) {
      console.log(error.message);
      res.status(500).json({ message: "Error al crear los comentarios" });
    }
  }

  static  eliminarComentario = async (req: Request , res : Response):Promise<void> =>{
    const user = req.user?.usuario_id;
    console.log(user);
    
    if (!user) {
      res.status(401).json({ message: "user unauthorized" });
      return;
    }
    const comentario_id = Number(req.params.id);
    if (comentario_id === null) {
      res.status(400).json({ message: "ID vlog no valido" });
      return;
    }
    try {
      const result = await comentarioModel.deleteComentario(comentario_id,user);

      res.status(201).json(result);
    } catch (error:any) {
      console.log(error.message);
      res.status(500).json({ message: "Error al crear los comentarios" });
    }
  }
}
