import { Request, Response } from "express";
import { blogUserModel } from "../model/blogUserModel";
import { validateBlog } from "../schema/blogsSchema";
import { blogUserTypeFront, UpdateBlogUser } from "../types/blogUser";

export class blogUserController {
  static getBlog = async (req: Request, res: Response): Promise<void> => {
    const user = req.user?.usuario_id;
    if (!user) {
      res.status(401).json({ message: "user unauthorized" });
      return;
    }
    try {
      const result = await blogUserModel.getBlogUser(user);
      res.status(200).json(result);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error al obtener los blogs del usuario" });
      console.error(error.message);
    }
  };

  static getBlogById = async (req: Request, res: Response): Promise<void> => {
    const blog = Number(req.params.id);
    const user = req.user?.usuario_id;
    if (!user) {
      res.status(401).json({ message: "user unauthorized" });
      return;
    }
    try {
      const blogUser = await blogUserModel.getBlogUserById(blog, user);

      if (!blogUser.length) {
        res.status(404).json({ message: "No se encontró el blog o no tienes permisos" });
        return;
      }
  
      res.status(200).json(blogUser[0]);
    } catch (error: any) {
      res.status(500).json({ message: "Error al obtener el blog del usuario" });
      console.error(error.message);
    }
  };

  static createBlogUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const user = req.user?.usuario_id;
    if (!user) {
      res.status(401).json({ message: "user unauthorized" });
      return;
    }
    try {
      const vali = validateBlog(req.body);
      if (!vali.valid) {
        res.status(400).json({ errors: vali.errors });
        return;
      }

      const { titulo, contenido, fecha_publicacion } =
        vali.data as blogUserTypeFront;

      const newBlogUser = await blogUserModel.createBlogUser(
        { titulo, contenido, fecha_publicacion },
        user
      );
      res.status(201).json(newBlogUser);
    } catch (error: any) {
      res.status(500).json({ message: "Error al crear los blogs del usuario" });
      console.error(error.message);
    }
  };

  static deleteBlogUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const blog = Number(req.params.id);
    const userId = req.user?.usuario_id;

  if (!userId) {
    res.status(401).json({ message: "user unauthorized" });
    return;
  }
    try {
      const deleteBlog = await blogUserModel.deleteBlogUser(blog,userId);
      if (!deleteBlog) {
        res.status(404).json({ message: "No tienes permisos o no existe el blog" });
        return;
      }
      res.status(201).json(deleteBlog);
    } catch (error: any) {
      res.status(500).json({ message: "Error al crear los blogs del usuario" });
      console.error(error.message);
    }
  };

  static updateBlogUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const blog_id = Number(req.params.id);
    const user = req.user?.usuario_id;
    if (!user) {
      res.status(401).json({ message: "user unauthorized" });
      return;
    }
    try {
      const vali = validateBlog(req.body);
      if (!vali.valid) {
        res.status(400).json({ errors: vali.errors });
        return;
      }
      const { titulo, contenido, fecha_publicacion } =
        vali.data as UpdateBlogUser;
      const newUser = await blogUserModel.updateBlogUser(
        { titulo, contenido, fecha_publicacion },
        blog_id,
        user
      );

      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ message: "Error al actuaizar los blogs del usuario" });
      console.error(error.message);
    }
  };
}
