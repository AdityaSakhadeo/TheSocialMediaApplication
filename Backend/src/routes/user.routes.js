import { Router } from "express";
import {registerUser,loginUser,logoutUser, uploadProfileImage, getUserProfile, followUser, suggestRelevantUsers, updateProfile} from "../controllers/user.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
// router.route("/uploadProfileImage").post(
//     upload.fields([
//         {
//         name:"profilImage",
//         maxCount:1
//         }
//     ]),
//     uploadProfileImage
// )
router.route("/getUserProfile").get(getUserProfile);
router.route("/follow").post(followUser);
router.route("/getUserSuggestion").get(suggestRelevantUsers);
router.route("/updateProfile").post(
    upload.fields([
        {
            name:"newData",
            maxCount:1
        }
    ]),
    updateProfile);

export default router;