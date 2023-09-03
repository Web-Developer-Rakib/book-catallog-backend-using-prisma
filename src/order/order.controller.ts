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
): Promise<void> => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to retrieve orders.",
      error: error.message,
    });
  }
};
export const getAllOrdersByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to retrieve orders.",
      error: error.message,
    });
  }
};
prisma.$disconnect();
