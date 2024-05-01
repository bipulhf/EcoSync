import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000", //(https://your-client-app.com)
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/", router);

export default app;
