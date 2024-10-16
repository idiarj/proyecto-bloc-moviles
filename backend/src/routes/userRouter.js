import { Router } from "express";
import { UserController } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.post('/register', UserController.registerControlPost);
userRouter.post('/login', UserController.loginControlPost);
userRouter.get('/login', UserController.loginControlGet);
userRouter.post('/logout', UserController.logoutControlPost);
