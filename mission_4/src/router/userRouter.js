import express from "express";
import * as userController from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post('/users', userController.createUser);

userRouter.post('/login', userController.getUser);

export default userRouter;
