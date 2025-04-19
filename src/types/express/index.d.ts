import { tokenPayload } from "../authTypes";

declare global {
  namespace Express {
    interface Request {
      user?: tokenPayload;
    }
  }
}    

export {};  