import express from "express";
import verifyAdmin from "../../middlewares/verifyAdmin";
import verifyCustomer from "../../middlewares/verifyCustomer";
import {
  createOrder,
  getAllOrders,
  getAllOrdersByUser,
} from "./order.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", verifyCustomer, createOrder);
orderRouter.get("/", verifyAdmin, getAllOrders);
orderRouter.get("/:userId", verifyCustomer, getAllOrdersByUser);

export default orderRouter;
