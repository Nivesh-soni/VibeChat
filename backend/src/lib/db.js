import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const {MONGO_URI} = process.env
    if(!MONGO_URI) throw new Error("MONGO_URI is not set")

    const conn = await mongoose.connect(MONGO_URI);
    console.log(`DB Connected ${conn.connection.host}`);
  } catch (err) {
    console.error("Error in connection of DB", err);
    process.exit(1);
  }
};
