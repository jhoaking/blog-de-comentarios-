// import { Request,Response,NextFunction } from "express";
// import jwt from 'jsonwebtoken'
// import { SECRET_JWT_KEY } from "../config";
// // import { tokenPayload} from "../types/authTypes";

// export const validateAuth = async (req : Request , res: Response , next: NextFunction) : Promise<void> =>{
//     try {
//         const token = req.cookies.access_token;
//         if(!token){
//             res.status(400).json({message : 'token invalido'});
//         }

//         const decoded =  jwt.verify(token,SECRET_JWT_KEY);
        

//         req.user = decoded  ;
//         next();
//     } catch (error ) {
      
//     }
// }