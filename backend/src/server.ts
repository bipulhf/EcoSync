import express from "express";

import router_shifat from "./router_shifat";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use("/api", router_shifat);

export default app;
