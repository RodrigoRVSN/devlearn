import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "./database/connect";
import router from "./routes";

const app = express();

const cors = require("cors");
app.use(cors())

app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(4000, () => console.log("🏃 Server is running in localhost:4000"));
