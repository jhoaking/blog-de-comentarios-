export interface BlogUserType{
    blog_id : number,
    titulo : string,
    contenido : string
    fecha_publicacion : string,
    usuario_id ?: number
}

export type CreateBlogUser = Pick<BlogUserType , 'titulo'| 'contenido'| 'fecha_publicacion'>;
export type UpdateBlogUser = Partial<BlogUserType>;