import authRouter from "../src/auth/auth.routes";
import orderRouter from "../src/auth/order/order.routes";
import bookRouter from "../src/book/book.routes";
import categoryRouter from "../src/category/catagory.routes";
import userRouter from "../src/user/user.routes";

export const routes = [
  {
    path: "auth",
    router: authRouter,
  },
  {
    path: "users",
    router: userRouter,
  },
  {
    path: "categories",
    router: categoryRouter,
  },
  {
    path: "books",
    router: bookRouter,
  },
  {
    path: "orders",
    router: orderRouter,
  },
];
