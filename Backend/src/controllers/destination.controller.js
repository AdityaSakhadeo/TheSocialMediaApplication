import Destination from "../models/destinationModel";
import { ApiResponse } from "../utils/APIResponse";
/**
 * @description : Function to create new destination
 * @route : /api/v1/destinations/createDestination
 * @access : Private
 */

import { asyncHandler } from "../utils/asyncHandler";

export const createDestination = asyncHandler(async (req,res)=>{
    const {name,location} = req.body;
    if (!name || !location) {
        return res
        .status(400)
        .json(new ApiResponse(400,null,"Please enter all the fields necessary to create new destination"));
    }

    const duplicateName = await Destination.findOne(name);
    const duplicateLocation = await Destination.findOne(location);

    if (duplicateName) {
        return res
        .status(400)
        .json(new ApiResponse(400,null,'Destination with same name already exists'));
    }

    if (duplicateLocation) {
        return res
        .status(400)
        .json(new ApiResponse(400,null,"Destination with same location already exists"));
    }

    const num = /^[0-9]$/;
    if (num.test(name)) {
        return res
        .status(400)
        .json(400,null,"Number can not be the part of the name of the destination");
    }

    try {
        const destination = await Destination.create({
            name,
            location
        })

        const createdDestination = await findOne(destination._id);

        if (!createdDestination) {
            return res
            .status(400)
            .json(new ApiResponse(400,null,"Server error while creating the new destination"));
        }

        return res
        .status(201)
        .json(new ApiResponse(201,createDestination,"Destination created successfully!!"));
        
    } catch (error) {
        console.log(error);
    }
})