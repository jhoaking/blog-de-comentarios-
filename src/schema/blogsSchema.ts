import z from 'zod';


const validatePost = z.object({
    titulo :z.string().min(1),
    contenido : z.string().min(1),
    fecha_publicacion: z.string()
})

export const validarBlog = (data:any)  => {
    const result = validatePost.safeParse(data);
  
    if (!result.success) {
      return { valid: false, errors: result.error.format()};
    }
    return { valid: true, data: result.data };
  };