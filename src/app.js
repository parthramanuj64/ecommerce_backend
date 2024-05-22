import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Acccpt JSON and JSON size was maximum 16kb
app.use(
  express.json({
    limit: "16kb",
  })
);

// Some URLs are change the name like home+work or home%20work so convert into useful form that time below code
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// store files, folder .. in the public folder
app.use(express.static("public"));

// Access and set user cookie
app.use(cookieParser());

// routes
import userRouter from "./routes/user.routes.js";
import fakerRouter from "./routes/faker.routes.js";
import productRouter from "./routes/product.routes.js";
import cutomerRouter from "./routes/customer.routes.js";
import transactionRouter from "./routes/transaction.routes.js";

// routes.declartion

app.use("/api/v1/users", userRouter);
app.use("/api/v1/faker", fakerRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/customer", cutomerRouter);
app.use("/api/v1/transactions", transactionRouter);

export { app };
