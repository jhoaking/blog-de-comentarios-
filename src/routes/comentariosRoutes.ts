import { Router } from "express";
import { comentarioController } from "../controller/comentarioUser";

export const comentarioRoute = Router();
comentarioRoute.get('/:blog_id/comentario',comentarioController.obtenerComentarios);
