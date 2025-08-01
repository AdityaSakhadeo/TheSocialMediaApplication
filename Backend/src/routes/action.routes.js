import { Router } from "express";
import { followDestination, followUser } from "../controllers/action.controller.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";
const router = Router();

router.route("/follow").post(verifyJWT,followUser);
router.route("/followDestination").post(verifyJWT,followDestination)

export default router;