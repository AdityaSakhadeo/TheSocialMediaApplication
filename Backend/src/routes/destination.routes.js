import { Router } from "express";
import { addPointToDestination, createDestination, getDestinationID } from "../controllers/destination.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
const router = Router();
router.route('/createDestination').post(
    upload.fields([
        {
            name: "destinationImages",
            maxCount: 5
        }
    ]),
    createDestination);
router.route('/getDestinationID').get(getDestinationID);
router.route('/addSpotsToDestination').post(
    upload.fields([
        {
            name: "spotImages",
            maxCount: 5
        }
    ]),
    addPointToDestination);

export default router;