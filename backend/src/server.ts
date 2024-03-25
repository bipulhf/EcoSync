import express from "express";
import cors from "cors";

import router_shifat from "./router_shifat";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000", //(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/", router_shifat);

export default app;
