import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URI) return console.log("MONGODB_URI is not defined in .env");

    if (isConnected) console.log("using the existing database");
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("mongoDB connected");

    } catch (error) {
        console.log(error)
    }

}