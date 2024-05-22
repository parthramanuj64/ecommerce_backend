import dotenv from "dotenv";
import connectDB from "./db/setup_db.js";
import { app } from "./app.js";
import { port } from "./constants.js";
import { generateData } from "./controllers/dummy.controller.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then((response) => {
    
    app.listen(port, () => {
      console.log(`Server is Running at PORT : ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection Failed");
  });
