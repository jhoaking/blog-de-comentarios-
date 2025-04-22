import { Request, Response, CookieOptions } from "express";
import { validateRegisterUser } from "../schema/usuarioSchema";
import {  AuthType } from "../types/authTypes";
import { authModel } from "../model/authModel";
import { AuthService } from "../service/authService";


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const vali = validateRegisterUser.safeParse(req.body);
    if (!vali.success) {
      res.status(400).json({ errors: vali.error.errors });
      return;
    }

    const {nombre,email,password} = vali.data
    const foundEmail = await authModel.getByEmail(email);

    if (foundEmail) {
      res.status(400).json({ errors: "El email ya fue registrado" });
      return;
    }
    const user = await authModel.registerUser({nombre,email,password});
    res.status(200).json({ message: "Usuario registrado correctamente", user });

  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Error al registrar usuario controller" });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  const {email,password} = req.body;
  
  try {
    if (!email || !password) {
       res
        .status(400)
        .json({ message: "Faltan los campos necesarios: email o contraseña" });
    }

    const  user  =await authModel.getByEmail(email);

    if (!user) {
      res.status(404).json({ message: "El email no está registrado" });
      return ;
    }

    const validPassword  =  await AuthService.comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(404).json({ message: "La contraseña es incorrecta" });
    }

   const token = AuthService.createToken(user);

    const options: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    };

    res
      .status(200)
      .cookie("access_token", token, options)
      .json({ message: "Login exitoso" ,user});

  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Error al logear usuario controller" });
  }
};


export const protectedRoute = (req: Request, res: Response) => {
  const user = req.user as AuthType;

  if (!user) {
    return res.status(401).json({ message: "Usuario no autorizado" });
  }

  return res.status(200).json({ message: "Usuario autorizado", user });
};


export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("access_token", { httpOnly: true, sameSite: "strict" });
    res.status(200).json({ message: "Logout exitoso" });

  } catch (error: any) {
    res.status(500).json({ message: "Error al cerrar sesión", error: error.message });
  }
};
