export interface Blogs{
    blog_id : number,
    titulo : String,
    contenido  :string,
    fecha_publicacion : string,
    usuario_id : number
}

export type BlogSinId = Omit<Blogs, 'blog_id'| 'usuario_id'>