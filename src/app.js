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
// import the routes
import userRoutes from "./routes/user.routes.js";
import {router} from "./routes/healthcheck.routes.js";
//routes
app.use("/api/v1/healthcheck",router);
app.use("/api/v1/users",router);
app.use(cookieParser())


export {app};




