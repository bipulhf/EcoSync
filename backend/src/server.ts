import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter";
import userRouter from "./routers/userRouter";
import vehicleRouter from "./routers/vehicleRouter";
import stsRouter from "./routers/stsRouter";
import landfillRouter from "./routers/landfillRouter";
import reportRouter from "./routers/reportRouter";

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

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", vehicleRouter);
app.use("/", stsRouter);
app.use("/", landfillRouter);
app.use("/", reportRouter);

export default app;
