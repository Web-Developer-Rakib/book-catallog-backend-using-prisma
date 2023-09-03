import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
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
