import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// ✅ Body parsers only
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
// so /uploads/... is reachable
app.use(cookieParser());

// ✅ Import routes
import Userrouter from "./routes/user.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

// ✅ Use routes
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", Userrouter);

// ✅ Error handler
app.use(errorHandler);

export { app };
