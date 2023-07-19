import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connectDB.js";
import userRouter from "./Routers/userRouter.js";
import messageRouter from "./Routers/messageRouter.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
dotenv.config();
connectDB(app, port);

//? this layer important when send data in form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads/"));

app.use(userRouter);
app.use(messageRouter);

//! Not Found Page
app.use((request, response, next) => {
  const error = new Error(`Not found - ${request.originalUrl}`);
  error.status = 404;
  next(error);
});
//! to catch any error
app.use((error, request, response, next) => {
  response.status(error.status || 500).json({
    message: error + "",
    // status: error.status,
    //! display it in dev mode and remove it when production mode
    // stack: error.stack,
  });
});

//? two layer to catch any error in syntax error or error out of express
// process.on("unhandledRejection");
// process.on("uncaughtException");
