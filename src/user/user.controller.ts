import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
const prisma = new PrismaClient();
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to retrieve users.",
      error: error.message,
    });
  }
};
export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User fetched successfully",
        data: user,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to retrieve the user.",
      error: error.message,
    });
  }
};
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, contactNo, address, profileImg } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found.",
      });
    } else {
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          contactNo,
          address,
          profileImg,
        },
      });
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User updated successfully",
        data: updatedUser,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to update the user.",
      error: error.message,
    });
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found.",
      });
    } else {
      await prisma.user.delete({
        where: {
          id,
        },
      });
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User deleted successfully",
        data: user,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to delete the user.",
      error: error.message,
    });
  }
};
prisma.$disconnect();
