
// import { Router } from "express";
// import { registeruser } from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";

// const router = Router();

// // ✅ Multer integrated route
// router.post("/register", upload.single("avatar"), registeruser);

// export default router;


import express from "express";
import { registeruser,logoutUser, loginUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, getUserChannelProfile, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getWatchHistory } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import  {verifyJWT} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  registeruser
);
//unsecured routes
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)
//secured routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/update-coverImage").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)
router.route("/history").get(verifyJWT,getWatchHistory)


// // we can use multiple middlewares in between 1st middleware and final route
// router.route("/logout").post(verifyJWT,logoutUser)

export default router;
