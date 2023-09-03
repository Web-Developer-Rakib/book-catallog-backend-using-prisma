import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
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
