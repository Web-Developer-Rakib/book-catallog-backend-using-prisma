import express from "express";
import verifyAdmin from "../../middlewares/verifyAdmin";
import { getAllUsers, getSingleUser, updateUser } from "./user.controller";
const userRouter = express.Router();

userRouter.get("/", verifyAdmin, getAllUsers);
userRouter.get("/:id", verifyAdmin, getSingleUser);
userRouter.patch("/:id", verifyAdmin, updateUser);
userRouter.delete("/:id", verifyAdmin, updateUser);

export default userRouter;
