import { Router } from "express";
import {registerUser,loginUser,logoutUser} from "../controllers/user.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(
    // upload.fields([
    //     {
    //         name: "profilePhoto",
    //         maxCount:1
    //     }
    // ]),
    registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;