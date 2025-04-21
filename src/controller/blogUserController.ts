import { getUserBlog,createUserBlog,deleteUserBlog,updateUserBlog } from "../service/blogUser";
import { Response } from "express";
import { validarBlog } from "../schema/blogsSchema";
import { RequestConUsuario } from "../types/authTypes";
import { Blogs } from "../types/blogsTypes";

export class blogUserController {
    static obtenerBlogUser = async (req: RequestConUsuario , res : Response):Promise<void> => {
        const req_id = req.user.usuario_id;
        try {
            const result = await getUserBlog(req_id);
            res.status(200).json(result) 
        } catch (error) {
            res.status(500).json({message : 'error al obtener blog de usuarios'})
        }
    }

    static crearBlogUsuario = async (req : RequestConUsuario , res : Response) : Promise<void> =>{
        try {
            const vali = validarBlog(req.body);
            if(!vali.valid){
                res.status(400).json({ errors: vali.errors });
                return;
            }
            // const { titulo, contenido, fecha_publicacion } = vali.data;
            const user = req.user.usuario_id;

            // const result  =await createUserBlog({ titulo, contenido, fecha_publicacion } , user);

            // res.status(201).json({message : 'blog creado con exito', result})
        } catch (error) {
            res.status(500).json({message : 'error al crear blog de usuarios'})
        }
     }

}