import { Request, Response } from "express";
import { comentarioModel } from "../model/comentarioModel";
// import { validateComment } from "../schema/comentariosSchema";

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


}
