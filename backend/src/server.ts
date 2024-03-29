import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import router_shifat from "./router_shifat";
import cors from "cors";

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

app.use("/", router_shifat);

export default app;
