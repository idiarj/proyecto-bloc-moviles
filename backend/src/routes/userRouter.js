import { Router } from "express";
import { UserController } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.post('/register', UserController.registerControlPost);
userRouter.post('/login', UserController.loginControlPost);
userRouter.get('/login', UserController.loginControlGet);
userRouter.post('/logout', UserController.logoutControlPost);
userRouter.get('/recoveryData', UserController);
userRouter.post('/recoveryData', UserController.postRecoveryData);
userRouter.post('/recoveryData/answer', UserController.postRecoveryAnswer);
userRouter.put('/setNewPassword', UserController.putPassword);
