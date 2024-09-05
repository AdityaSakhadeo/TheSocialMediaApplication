import { Router } from "express";
import registerUser from "../controllers/user.controller.js";
import loginUser from '../controllers/user.controller.js'
import { upload } from "../Middleware/multer.middleware.js";
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

export default router;