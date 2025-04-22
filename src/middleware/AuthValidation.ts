import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config";
import { AuthType } from "../types/authTypes";


export const validateAuth = (
  req: Request & { user?: AuthType },
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.access_token;
    
    if (!token) {
      res.status(401).json({ message: "Token no encontrado" });
      return;
    }

    const decoded = jwt.verify(token, SECRET_JWT_KEY) as AuthType;

    req.user = decoded as AuthType;

    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al verificar el token:", error.message);
       res.status(403).json({ message: "Token inválido o expirado" });
    }
  }
};