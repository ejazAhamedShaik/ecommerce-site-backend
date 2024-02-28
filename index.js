import express, { json } from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import { homeHandler } from "./controllers/userControllers.js";
import { userRouter } from "./routes/userRouter.js";
import { productRouter } from "./routes/productRouter.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const db = process.env.DB_URL;

/** DB Connection starts */
connect(db)
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Connection failed");
  });
/** DB Connection ends */

/** Middlewares */
app.use(json());
// app.use(isBodyEmpty) --> It gets rendered for all the handlers including get request

/** Home Page */
app.get("/", homeHandler);

/** User Routes */
app.use("/api/user", userRouter);

/** Product Routes */
app.use("/api/product", productRouter);

/** Central error handling */
app.use((err, req, res, next) => {
  console.log("Central error handling");
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).send({
    message: message,
  });
});

app.listen(PORT, () => {
  console.log("App is listening at port 3000");
});
