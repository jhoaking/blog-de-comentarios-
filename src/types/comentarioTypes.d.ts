export interface ComentarioType{
    comentario_id : number,
    contenido : string,
    fecha_publicacion : string,
    blog_id : number ,
    usuario_id : number
}


export type CreateComentarioBlog = Pick<ComentarioType, 'contenido' | 'fecha_publicacion'>