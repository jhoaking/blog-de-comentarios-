import { Router } from "express";
import { comentarioController } from "../controller/comentarioUser";

export const comentarioRoute = Router();
comentarioRoute.get('/blogs/:blog_id/comentarios',comentarioController.obtenerComentarios);
