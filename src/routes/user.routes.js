// import { Router } from "express";
// import { registeruser } from "../controllers/user.controller.js";

// const router = Router();
// router.route("/register").post(registeruser);

// export default router;


import { Router } from "express";
import { registeruser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// multer only for this route
router
  .route("/register")
  .post(
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "coverImage", maxCount: 1 }
    ]),
    registeruser
  );

export default router;
