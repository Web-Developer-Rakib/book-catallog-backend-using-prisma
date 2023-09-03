import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title } = req.body;
    const category = await prisma.category.create({
      data: {
        title,
      },
    });
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Category created successfully",
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to create the category.",
      error: error.message,
    });
  }
};
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
export const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
