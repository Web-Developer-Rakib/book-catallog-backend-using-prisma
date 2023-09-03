import express from "express";
import verifyAdmin from "../../middlewares/verifyAdmin";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBooksByCategory,
  getSingleBook,
  updateBook,
} from "./book.controller";
const bookRouter = express.Router();

bookRouter.post("/create-book", verifyAdmin, createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:categoryId", getBooksByCategory);
bookRouter.get("/:id", getSingleBook);
bookRouter.patch("/:id", verifyAdmin, updateBook);
bookRouter.delete("/:id", verifyAdmin, deleteBook);

export default bookRouter;
