import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "../.env",
});
connectDB()
  .then(() => {
    try {
      app.on("error", () => {
        throw error;
      });
      app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port: ${process.env.PORT}`);
      });
    } catch (err) {
      console.error("something went wrong while connecting express " + err);
    }
  })
  .catch((err) => {
    console.log("database connection failed" + err);
  });
