// import { AuthService } from "../service/authService";
// import { Request,Response,CookieOptions  } from "express";
// import { validaRegister, validarLogin } from "../schema/usuarioSchema";
// import {  AuthLogin, AuthSinId, AuthType } from "../types/AuthTypes";


// export class authController {
//     static register = async (req : Request , res : Response) : Promise<void> =>{
//         try {
//             const vali = validaRegister(req.body);
//             if(!vali.valid){
//                 res.status(400).json({ errors: vali.errors });
//                 return;
//             }
//            const  user = await AuthService.registerUser(vali.data as AuthSinId);

//            res.status(200).json({message: "Usuario registrado correctamente",user});

//         } catch (error : any) {
//             console.error(error.message);
//             res.status(500).json({message : 'error al registrar usuario controller'})
//         }
//     }

//     static login = async (req:Request , res:Response): Promise<void> =>{
//         try {
//             const vali = validarLogin(req.body);
//              if(!vali.valid){
//                 res.status(400).json({ errors: vali.errors });
//                 return;
//              }

//              const { user, token } = await AuthService.loginUser(vali.data as AuthLogin);

//              const options: CookieOptions  = {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === "production", 
//                 sameSite: 'Strict' as 'strict', 
//                 maxAge: 1000 * 60 * 60, 
//             };
//                res
//                 .status(200)
//                 .cookie("access_token", token, options)
//                 .json({
//                   message: "Login exitoso",
//                   user
//                 });
//         } catch (error: any) {
//             console.error(error.message);
//             res.status(500).json({message : 'error al ogear usuario controller'})
//         }
//     }

//     static protected = async (req : Request , res : Response) : Promise<void> =>{
//         const user = req.user as AuthType
//         try {
//             if (!user) {
//                  res.status(401).json({ message: "Usuario no autorizado" });
//                  return ;
//               }
          
//               res.status(200).json({ message: "Usuario autorizado" });
//         } catch (error : any) {
//             console.error(error.message);
//             res.status(500).json({message : 'error al acceder al protected usuario controller'})
//         }
//     }

//     static logout = async (_req : Request , res : Response): Promise<void> =>{
//         try {
//             res.clearCookie("access_token", { httpOnly: true, sameSite: "strict" });
      
//              res.status(200).json({ message: "Logout exitoso" });
//           } catch (error : any) {
//             res
//               .status(500)
//               .json({ message: "Error al cerrar sesión", error: error.message });
//           }
        
//     }
// }