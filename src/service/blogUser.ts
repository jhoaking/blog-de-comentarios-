import { blogUsuarioModel } from "../model/blogModel";
import { Blogs, BlogSinId } from "../types/blogsTypes";

export const getUserBlog  = async (id : number) :Promise<Blogs[]> =>{
    const user = await blogUsuarioModel.obtenerBlogUsuario(id);
    return  user;
}

export const createUserBlog = async (data : BlogSinId , id : number): Promise<Blogs> =>{
    const createUser = await blogUsuarioModel.crearBlogUsuario(data,id) ;
    return createUser;
}


export const deleteUserBlog = async (id : number , id_blog : number) : Promise<boolean> =>{
    const user = await blogUsuarioModel.eliminarlogUsuario(id,id_blog);
    return user;
}

export const updateUserBlog  = async (id : number , data : BlogSinId): Promise<boolean> =>{
    const user = await blogUsuarioModel.actualizarBolgUsuario(id,data);
    return user;
}