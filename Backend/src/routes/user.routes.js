import { Router } from "express";
import {registerUser,loginUser,logoutUser, uploadProfileImage, getUserProfile} from "../controllers/user.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "profilePhoto",
            maxCount:1
        }
    ]),
    registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/uploadProfileImage").post(
    upload.fields([
        {
        name:"profilImage",
        maxCount:1
        }
    ]),
    uploadProfileImage
)
router.route("/getUserProfile").get(getUserProfile);

export default router;