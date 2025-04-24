import { Request, Response } from "express";
import { blogUserModel } from "../model/blogUserModel";
import { validateBlog } from "../schema/blogsSchema";
import {  blogUserTypeFront } from "../types/blogUser";

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
        res.status(500).json({ message: 'Error al obtener los blogs del usuario' });
        console.error(error.message);
    }
  };

  static getBlogById = async (req : Request , res : Response): Promise<void> =>{
    const blog = Number(req.params.id);
    const user = req.user?.usuario_id;
    if (!user) {
        res.status(401).json({ message: "user unauthorized" });
        return;
      }
    try {
        const blogUser = await blogUserModel.getBlogUserById(blog,user);
        res.status(200).json(blogUser[0]);
    } catch (error:any) {
        res.status(500).json({ message: 'Error al obtener el blog del usuario' });
        console.error(error.message);
    }
  }

  static createBlogUser = async (req:Request , res : Response):Promise<void> =>{
    const user = req.user?.usuario_id;
    if (!user) {
        res.status(401).json({ message: "user unauthorized" });
        return;
      }
    try {
        const vali = validateBlog(req.body);
        if(!vali.valid){
            res.status(400).json({ errors: vali.errors });
            return;
        }

        const {titulo,contenido,fecha_publicacion} = vali.data as blogUserTypeFront

        const newBlogUser = await blogUserModel.createBlogUser({titulo,contenido,fecha_publicacion},user) 
        res.status(201).json(newBlogUser);
    } catch (error:any) {
        res.status(500).json({ message: 'Error al crear los blogs del usuario' });
        console.error(error.message);
    }
  }
}
