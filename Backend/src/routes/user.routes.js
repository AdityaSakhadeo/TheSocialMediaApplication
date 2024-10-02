import { Router } from "express";
import {registerUser,loginUser,logoutUser, getUserProfile, followUser, suggestRelevantUsers, editProfile} from "../controllers/user.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/getUserProfile").get(getUserProfile);
router.route("/follow").post(followUser);
router.route("/getUserSuggestion").get(suggestRelevantUsers);
router.route("/editProfile").post(
    upload.fields([
        {
            name:"newData",
            maxCount:1
        }
    ]),
    editProfile);

export default router;