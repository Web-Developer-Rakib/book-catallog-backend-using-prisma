import express from "express";
import {
  createOrder,
  getAllOrders,
  getAllOrdersByUser,
} from "./order.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/by-user", getAllOrdersByUser);

export default orderRouter;
