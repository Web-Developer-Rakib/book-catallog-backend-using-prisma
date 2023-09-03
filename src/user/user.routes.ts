import express from "express";
import { getAllUsers, getSingleUser, updateUser } from "./user.controller";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSingleUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", updateUser);

export default userRouter;
