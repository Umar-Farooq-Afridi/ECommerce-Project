import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (request, response) => {
  response.send("<h1>ECommerce Project by Umar Farooq.</h1>");
});

app.use("/api/user", userRouter);

export default app;
