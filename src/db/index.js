import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; // Make sure DB_NAME is defined here

const connectDB = async () => {
    try {
        // It's often better to have the full connection string, including the DB name, in the .env file
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        
        // Corrected the typo here from "conectionInstance" to "connectionInstance"
        console.log(`\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        // Log the actual error to see what went wrong
        console.error("MONGODB connection FAILED: ", error);
        process.exit(1); // Exit process with failure
    }
}

export { connectDB };