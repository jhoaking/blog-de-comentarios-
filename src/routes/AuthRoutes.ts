import { Router } from "express";
import { validateAuth } from "../middleware/AuthValidation";
import { register,loginUser,logout,protectedRoute } from "../controller/controller2";

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', loginUser);
authRouter.get('/protected', validateAuth, protectedRoute);
authRouter.get('/logout', logout);

