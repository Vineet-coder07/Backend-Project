import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();
app.use(
    cors({
        origin : process.env.CORS_ORIGIN,
        credentials:true
    })
)

// express common middlewares
app.use(express.json({limit : '16kb'}))
app.use(express.urlencoded({extended : true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
// import the routes
import userRoutes from "./routes/user.routes.js";
import {router} from "./routes/healthcheck.routes.js";
import { errorHandler } from "./middlewares/error.middlewares.js";
//routes
app.use("/api/v1/healthcheck",router);
app.use("/api/v1/users",userRoutes);
app.use(errorHandler);


export {app};




