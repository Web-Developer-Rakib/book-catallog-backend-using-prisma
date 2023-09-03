import authRouter from "../src/auth/auth.routes";
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
];
