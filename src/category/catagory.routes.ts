import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "./category.controller";
const categoryRouter = express.Router();

categoryRouter.post("/create-category", createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getSingleCategory);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
