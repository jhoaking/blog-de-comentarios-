import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from "../config";

export const validateAuth = async (req : Request , res: Response , next: NextFunction) =>{
    try {
        const token = req.cookies.access_token;
        if(!token){
            res.status(400).json({message : 'token invalido'});
        }

        const decoded =  jwt.verify(token,SECRET_JWT_KEY);
        req.user = decoded;
        next();
    } catch (error ) {
      
    }
}