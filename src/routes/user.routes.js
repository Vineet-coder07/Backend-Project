
// import { Router } from "express";
// import { registeruser } from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";

// const router = Router();

// // ✅ Multer integrated route
// router.post("/register", upload.single("avatar"), registeruser);

// export default router;


import express from "express";
import { registeruser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  registeruser
);

export default router;
