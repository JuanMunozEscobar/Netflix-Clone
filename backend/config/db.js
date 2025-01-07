import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("Mongo DB Conncected " + conn.connection.host);
    } catch (error) {
        console.error("Error Connecting to DB: " + error.message);
        process.exit(1); // 1 means there was an error
    }
}