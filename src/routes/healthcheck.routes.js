import Router from "express";
import { healthcheck } from "../controllers/healthcheck.controlers.js";

const router=Router();

router.get("/",healthcheck);
export {router};