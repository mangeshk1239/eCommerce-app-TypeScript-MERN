import mongoose from "mongoose";

export default async function connectDB(): Promise<void> {

    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect("mongodb://localhost:27017/EcommerceTypeScript")
        .then(() => console.log("DB CONNECTED"))
        .catch(() => console.log("FAILED TO CONNECT TO DB"));

    } catch (error) {
        console.log("Connection to DB FAILED");
    }

}