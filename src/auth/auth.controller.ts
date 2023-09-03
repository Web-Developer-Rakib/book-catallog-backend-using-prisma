import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role, contactNo, address, profileImg } =
      req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        contactNo,
        address,
        profileImg,
      },
    });
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User created successfully!",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        contactNo: user.contactNo,
        address: user.address,
        profileImg: user.profileImg,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "User creation failed.",
      error: error.message,
    });
  }
};
prisma.$disconnect();
