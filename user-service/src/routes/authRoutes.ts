import { Router } from "express";
import AuthController from "../controllers/AuthController";

const userRouter = Router();

// @ts-ignore
userRouter.post("/register", AuthController.register);
// @ts-ignore
userRouter.post("/login", AuthController.login);

export default userRouter;
