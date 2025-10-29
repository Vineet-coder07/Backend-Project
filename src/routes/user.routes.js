// import { Router } from "express";
// import { registeruser } from "../controllers/user.controller.js";

// const router = Router();
// router.route("/register").post(registeruser);

// export default router;

import { Router } from "express";
import { registeruser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// ✅ Multer integrated route
router.post("/register", upload.single("avatar"), registeruser);

export default router;
