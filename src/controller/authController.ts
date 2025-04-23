import { auhModel } from "../model/authModel";
import {createToken,hasshedPassword, comparePassword} from "../service/authService";
import { CookieOptions, Request, Response } from "express";
import { AuthType, Register } from "../types/authTypes";
import { authSchema } from "../schema/authSchema";

export class authController {
  static register = async (req: Request, res: Response): Promise<void> => {
    try {
      const vali = authSchema.safeParse(req.body);
      if (!vali.success) {
        res.status(400).json({ errors: vali.error.errors });
        return;
      }
      const { nombre, email, password }: Register = vali.data;

      const buscarEmail = await auhModel.getByEmail(email);
      if (buscarEmail) {
        res.status(401).json({ message: "ya estas registrado" });
        return;
      }

      const hashearPassword = await hasshedPassword(password);

      const user = await auhModel.register({
        nombre,
        email,
        password: hashearPassword,
      });

      res.status(200).json({ message: "usuario registrado", user });
    } catch (error: any) {
      res.status(500).json({
        message: "error al registrar al usuario",
        error: error.message,
      });
    }
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        res.status(400).json({ message: "falta la contrasaeña y e email" });
        return;
      }

      const user = await auhModel.getByEmail(email);
      if (!user) {
        res.status(400).json({ message: "el email no esta registrado" });
        return;
      }

      const validarPassword = await comparePassword(password, user.password);
      if (!validarPassword) {
        res.status(400).json({ message: "contraseña invalida" });
        return;
      }

      const token = createToken(user);
      const options: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      };

      res
        .status(200)
        .cookie("access_token", token, options)
        .json({ message: "login exitoso" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "error al logear al usuario", error: error.message });
    }
  };

  static protectedUser = (req: Request, res: Response) => {
    const user = req.user as AuthType;

    if (!user) {
      res.status(401).json({ message: "usuario no autorizado" });
      return;
    }

    res.status(200).json({ message: " usuario autorizado", user });
  };

  static logout = (_req: Request, res: Response) => {
    res
      .clearCookie("access_token", { httpOnly: true, sameSite: "strict" })
      .status(200)
      .json({ message: "Logout exitoso" });
  };
}
