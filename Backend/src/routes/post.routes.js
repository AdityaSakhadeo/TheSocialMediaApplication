import { Router } from "express";
import { upload } from "../Middleware/multer.middleware.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";
import { createPost } from "../controllers/post.controller.js";
const router = Router();

router.route("/createPost").post(
    upolad.fields([
        {
            name:"image",
            maxCount:1
        }
    ]),
    createPost);

export default router;