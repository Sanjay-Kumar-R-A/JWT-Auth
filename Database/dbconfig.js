import mongoose from "mongoose";
import dotenv from "dotenv";

//.env configuration
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log(error);

    }
};

export default connectDB;
