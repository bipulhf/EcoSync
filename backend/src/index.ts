import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

app.listen(8000, () => {
  console.log("Server started on http://localhost:8000");
});
