import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, author, genre, price, publicationDate, categoryId } =
      req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        price,
        publicationDate,
        categoryId,
      },
      include: {
        category: true,
      },
    });
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to create the book.",
      error: error.message,
    });
  }
};
export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, size = 10 } = req.query;
    const parsedPage = parseInt(page as string, 10);
    const parsedSize = parseInt(size as string, 10);
    const skip = (parsedPage - 1) * parsedSize;
    const total = await prisma.book.count();
    const books = await prisma.book.findMany({
      skip,
      take: parsedSize,
      include: {
        category: true,
      },
    });
    const totalPage = Math.ceil(total / parsedSize);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Books fetched successfully",
      meta: {
        page: parsedPage,
        size: parsedSize,
        total,
        totalPage,
      },
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to fetch books.",
      error: error.message,
    });
  }
};
export const getBooksByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
export const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
