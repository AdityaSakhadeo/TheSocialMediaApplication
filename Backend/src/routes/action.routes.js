import { Router } from "express";
import { followDestination, followUser, postReactions } from "../controllers/action.controller.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";
const router = Router();

router.route("/follow").post(verifyJWT,followUser);
router.route("/followDestination").post(verifyJWT,followDestination);
router.route("/postReactions").post(postReactions);

export default router;