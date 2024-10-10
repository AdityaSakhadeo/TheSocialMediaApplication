import { Router } from "express";
import { upload } from "../Middleware/multer.middleware.js";
import { createPost } from "../controllers/post.controller.js";
const router = Router();

router.route("/createPost").post(
    upload.fields([
        {
            name:"image",
            maxCount:1
        }
    ]),
    createPost);

export default router;