import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
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
