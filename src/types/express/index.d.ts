import { AuthType } from "../AuthTypes";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: AuthType;
    }
  }
}