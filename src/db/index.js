import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "vitetube"
    });
    console.log(`✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ MONGODB connection FAILED: ", error.message);
    process.exit(1);
  }
};

export { connectDB };
