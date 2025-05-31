import { Router } from "express";
import { followUser } from "../controllers/action.controller.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";
const router = Router();

router.route("/follow").post(verifyJWT,followUser);


export default router;