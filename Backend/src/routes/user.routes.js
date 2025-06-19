import { Router } from "express";
import {registerUser,loginUser,logoutUser, getUserProfile, suggestRelevantUsers, editProfile, forgotPassword, resetPassword} from "../controllers/user.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/getUserProfile").get(verifyJWT,getUserProfile);
router.route("/getUserSuggestion").get(suggestRelevantUsers);
router.route("/editProfile").post(
    upload.fields([
        {
            name:"newData",
            maxCount:1
        }
    ]),
    editProfile);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
export default router;