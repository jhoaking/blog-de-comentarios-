import z from 'zod';

const blogSchema = z.object({
    titulo : z.string().min(1),
    contenido : z.string(),
    fecha_publicacion : z.string(),
    usuario_id : z.number().positive().int()
})

export const validateBlog = (data : any) => {
    const result = blogSchema.safeParse(data);
  
    if (!result.success) {
      return { valid: false, errors: result.error.format()};
    }
    return { valid: true, data: result.data };
  };
