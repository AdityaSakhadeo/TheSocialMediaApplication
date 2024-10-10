import { Router } from "express";
import { createDestination, getDestinationID } from "../controllers/destination.controller.js";

const router = Router();
router.route('/createDestination').post(createDestination);
router.route('/getDestinationID').get(getDestinationID);

export default router;