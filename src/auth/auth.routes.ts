import express from "express";
import { signup } from "./auth.controller";
const authRouter = express.Router();

authRouter.post("/signup", signup);

export default authRouter;
