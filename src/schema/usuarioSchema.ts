import z from 'zod';



export const validateRegisterUser = z.object({
    nombre : z.string().min(1),
    email : z.string().email(),
    password : z.string().min(6)
})

