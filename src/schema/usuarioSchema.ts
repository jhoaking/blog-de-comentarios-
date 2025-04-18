import z from 'zod';



const validateRegisterUser = z.object({
    nombre : z.string().min(1),
    email : z.string().email(),
    password : z.string().min(6)
})

export const validaRegister = (data:any)  => {
    const result = validateRegisterUser.safeParse(data);
  
    if (!result.success) {
      return { valid: false, errors: result.error.format()};
    }
    return { valid: true, data: result.data };
  };
  

const  validateLoginUser = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})


export const validarLogin = (data:any)  => {
    const result = validateLoginUser.safeParse(data);
  
    if (!result.success) {
      return { valid: false, errors: result.error.format()};
    }
    return { valid: true, data: result.data };
  };