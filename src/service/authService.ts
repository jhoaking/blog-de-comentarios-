import bcrypt from "bcrypt";
import { SECRET_JWT_KEY, SALT_ROUNDS } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthType } from "../types/authTypes";

export const hasshedPassword = async (passsword: string): Promise<string> => {
  try {
    const hashed = await bcrypt.hash(passsword, Number(SALT_ROUNDS));
    return hashed;
  } catch (error: any) {
    throw new Error("error al hashear la password");
  }
};

export const comparePassword = async (
  passswordNoHashed: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const compare = await bcrypt.compare(passswordNoHashed, hashedPassword);
    return compare;
  } catch (error: any) {
    throw new Error("error al comparar las passwords");
  }
};
export const createToken = (user: AuthType): string => {
  try {
    const token = jwt.sign(
      { usuario_id: user.usuario_id, nombre: user.nombre, email: user.email },
      SECRET_JWT_KEY,
      { expiresIn: "48h" }
    );

    return token;
  } catch (error: any) {
    throw new Error("error al crear el token  en el service");
  }
};

export const verifyToken = (token: string): string | JwtPayload => {
  try {
    const verify = jwt.verify(token, SECRET_JWT_KEY);
    return verify;
  } catch (error: any) {
    throw new Error("error al verificar el token  en el service");
  }
};
