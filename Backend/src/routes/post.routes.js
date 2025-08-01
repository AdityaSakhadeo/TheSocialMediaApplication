import { Router } from "express";
import { upload } from "../Middleware/multer.middleware.js";
import { createPost, showFeed } from "../controllers/post.controller.js";
const router = Router();

router.route("/createPost").post(
    upload.fields([
        {
            name:"images",
            maxCount:5
        }
    ]),
    createPost);

router.route("/feed/:userId").get(showFeed);

export default router;