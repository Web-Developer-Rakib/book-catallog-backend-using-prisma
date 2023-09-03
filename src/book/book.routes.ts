import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBooksByCategory,
  getSingleBook,
  updateBook,
} from "./book.controller";
const bookRouter = express.Router();

bookRouter.post("/create-book", createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:categoryId", getBooksByCategory);
bookRouter.get("/:id", getSingleBook);
bookRouter.patch("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
