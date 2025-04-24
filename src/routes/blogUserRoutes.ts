import { Router } from "express";
import { blogUserController } from "../controller/blogUserController";
import { validateAuth } from "../middleware/authValidation";

export const blogUserRoutes = Router();

blogUserRoutes.get('/',validateAuth,blogUserController.getBlog);
blogUserRoutes.get('/:id',validateAuth,blogUserController.getBlogById);
blogUserRoutes.post('/',validateAuth,blogUserController.createBlogUser);
blogUserRoutes.put('/:id',validateAuth,blogUserController.updateBlogUser);
blogUserRoutes.delete('/:id',validateAuth,blogUserController.deleteBlogUser);
