import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from "../config";
import { AuthType } from "../types/authTypes";

export const validateAuth = (req: Request & { user?: AuthType }, res: Response,next: NextFunction ) => {
    try {
      const token = req.cookies.access_token;
      console.log("token", token);
  
      if (!token) {
        return res.status(401).json({ message: "Token no encontrado" });
      }
  
      const decoded = jwt.verify(token, SECRET_JWT_KEY) as AuthType;
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al verificar el token:", error.message);
        return res.status(403).json({ message: "Token inválido o expirado" });
      }
    }
  };