import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";
import createInitialInfo from "./helpers/createInitialInfo";

const port = +(process.env.PORT as string) || 8000;

app.listen(port, async () => {
  console.log(`Server started on http://localhost:${port}`);
  try {
    await createInitialInfo();
  } catch (e) {
    console.log(e);
  }
});
