import { Router } from "express";
import {registerUser,loginUser,logoutUser, getUserProfile, followUser, suggestRelevantUsers, editProfile} from "../controllers/user.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";
const router = Router();

router.route("/createPost").post(registerUser);

export default router;