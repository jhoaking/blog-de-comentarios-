import { Router } from "express";
import { authController } from "../controller/authController";
import { validateAuth } from "../middleware/authValidation";

export const authRoutes = Router();

authRoutes.post('/login',authController.login);
authRoutes.post('/register',authController.register);
authRoutes.get('/protected', validateAuth , authController.protectedUser);
authRoutes.get('/logout',authController.logout);
