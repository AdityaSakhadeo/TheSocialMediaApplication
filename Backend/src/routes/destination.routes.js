import { Router } from "express";
import { createDestination, getDestinationID } from "../controllers/destination.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
const router = Router();
router.route('/createDestination').post(
    upload.fields([
        {
            name: "postImages",
            maxCount: 5
        }
    ]),
    createDestination);
router.route('/getDestinationID').get(getDestinationID);

export default router;