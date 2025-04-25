import z from 'zod';

const comentarioSchema = z.object({
    contenido : z.string().min(1),
    fecha_publicacion : z.string(),
    blog_id : z.number().positive().int(),
    usuario_id : z.number().positive().int()
})

export const validateComment = (data : any) => {
    const result = comentarioSchema.safeParse(data);
  
    if (!result.success) {
      return { valid: false, errors: result.error.format()};
    }
    return { valid: true, data: result.data };
  };