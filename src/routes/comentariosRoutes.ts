import { Router } from "express";
import { comentarioController } from "../controller/comentarioUser";
import { validateAuth } from "../middleware/authValidation";

export const comentarioRoute = Router();
comentarioRoute.get('/:blog_id/comentario',comentarioController.obtenerComentarios);
comentarioRoute.post('/comentario',validateAuth,comentarioController.crearComentario);
comentarioRoute.delete('/:id',validateAuth,comentarioController.eliminarComentario);