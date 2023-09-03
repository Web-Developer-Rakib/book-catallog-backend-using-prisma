import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, orderedBooks } = req.body;

    // Generate a new UUID for the order
    const orderId = uuidv4();

    // Calculate the total price of the ordered books
    let totalPrice = 0;
    for (const orderedBook of orderedBooks) {
      const { bookId, quantity } = orderedBook;

      // Fetch the book's price from the database
      const book = await prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });

      if (!book) {
        res.status(404).json({
          success: false,
          statusCode: 404,
          message: `Book with ID ${bookId} not found.`,
        });
      }

      // Calculate the price for this book and quantity
      const bookPrice = book.price;
      totalPrice += bookPrice * quantity;
    }

    // Create the order in the database
    const createdOrder = await prisma.order.create({
      data: {
        id: orderId,
        userId,
        orderedBooks: {
          create: orderedBooks.map((book: any) => ({
            bookId: book.bookId,
            quantity: book.quantity,
          })),
        },
        status: "pending",
        totalPrice,
      },
    });
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Order created successfully",
      data: createdOrder,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to create the order.",
      error: error.message,
    });
  }
};
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
export const getAllOrdersByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
