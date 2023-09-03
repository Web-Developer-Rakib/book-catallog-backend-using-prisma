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
): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to fetch categories.",
      error: error.message,
    });
  }
};
export const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Category not found.",
      });
    } else {
      const books = await prisma.book.findMany({
        where: {
          categoryId: id,
        },
      });
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Category fetched successfully",
        data: {
          id: category.id,
          title: category.title,
          books: books,
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to fetch the category.",
      error: error.message, // You can customize the error message as needed
    });
  }
};
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Category not found.",
      });
    } else {
      const updatedCategory = await prisma.category.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to update the category.",
      error: error.message,
    });
  }
};
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
