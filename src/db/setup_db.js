import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { dummyData } from "../utils/dummyDataGenerate.js";

const connectDB = async () => {
  console.log(`${process.env.MONGODB_URL}${DB_NAME}`);
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`Connection Instances : ${connectionInstance}`);
    console.log(
      `\n MongoDB connected!! DB HOST : ${connectionInstance.connection.host}`
    );
    await dummyData().then((response) => {
      console.log("Dummy data is created");
    });
  } catch (error) {
    console.error("MONGODB connection error ", error);
    process.exit(1);
  }
};

export default connectDB;
