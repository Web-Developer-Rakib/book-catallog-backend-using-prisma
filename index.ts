import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotEnv from "dotenv";
import express, { Request, Response } from "express";
import { routes } from "./utils/routes";
dotEnv.config();
const app = express();
const port = process.env.PORT || 5000;
// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// Routes
routes.map((route) => app.use(`/api/v1/${route.path}`, route.router));
// Server homepage for test
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});
// Server listning
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
