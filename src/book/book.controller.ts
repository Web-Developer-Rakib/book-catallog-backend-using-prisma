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
): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const { page = 1, size = 10 } = req.query;
    const parsedPage = parseInt(page as string, 10);
    const parsedSize = parseInt(size as string, 10);

    const skip = (parsedPage - 1) * parsedSize;

    const total = await prisma.book.count({
      where: {
        categoryId,
      },
    });

    const books = await prisma.book.findMany({
      where: {
        categoryId,
      },
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
      message: "Books with associated category data fetched successfully",
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
      message: "Failed to fetch books by categoryId.",
      error: error.message,
    });
  }
};
export const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });
    if (!book) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Book not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Book fetched successfully",
        data: book,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to fetch the book.",
      error: error.message,
    });
  }
};
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, author, genre, price } = req.body;

    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Book not found.",
      });
    } else {
      const updatedBook = await prisma.book.update({
        where: {
          id,
        },
        data: {
          title,
          author,
          genre,
          price,
        },
        include: {
          category: true,
        },
      });

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Book updated successfully",
        data: updatedBook,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to update the book.",
      error: error.message,
    });
  }
};
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Book not found.",
      });
    }

    await prisma.book.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Book is deleted successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to delete the book.",
      error: error.message,
    });
  }
};
prisma.$disconnect();
