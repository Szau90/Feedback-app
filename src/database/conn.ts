import { error } from "console";
import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!);
  } catch {
    return Promise.reject(error);
  }
};

export default connectMongo;
