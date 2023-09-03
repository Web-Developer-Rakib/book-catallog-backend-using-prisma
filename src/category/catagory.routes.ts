import express from "express";
import verifyAdmin from "../../middlewares/verifyAdmin";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "./category.controller";
const categoryRouter = express.Router();

categoryRouter.post("/create-category", verifyAdmin, createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getSingleCategory);
categoryRouter.patch("/:id", verifyAdmin, updateCategory);
categoryRouter.delete("/:id", verifyAdmin, deleteCategory);

export default categoryRouter;
