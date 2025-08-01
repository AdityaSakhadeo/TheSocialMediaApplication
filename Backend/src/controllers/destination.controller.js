import Destination from "../models/destinationModel.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
/**
 * @description : API to create new destination
 * @route : /api/v1/destinations/createDestination
 * @access : Private
 * @payload : {name:destinationName,(Images from request (max 5) key destinationImages)}
 */

export const createDestination = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "New Destination should have name"));
    }

    const duplicateName = await Destination.findOne({ name: name.toLowerCase() });

    if (duplicateName) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, 'Destination with same name already exists'));
    }

    const imageFiles = req.files?.destinationImages;

    if (!imageFiles || imageFiles.length === 0) {
        return res
        .status(400)
        .json(new ApiResponse(400,null,"Destination should have atleast one image"))
    }

    const uploadedImages = await Promise.all(
        imageFiles.map(file=>uploadOnCloudinary(file.path))
    );

    const imageURLs = uploadedImages.map(img=>img.url);

    const num = /^[0-9]$/;
    if (num.test(name)) {
        return res
            .status(400)
            .json(400, null, "Number can not be the part of the name of the destination");
    }

    try {
        const destination = await Destination.create({
            name,
            destinationImages:imageURLs
        })

        const createdDestination = await Destination.findById(destination._id);

        if (!createdDestination) {
            return res
                .status(400)
                .json(new ApiResponse(400, null, "Server error while creating the new destination"));
        }

        return res
            .status(201)
            .json(new ApiResponse(201, createdDestination, "Destination created successfully!!"));

    } catch (error) {
        console.log(error);
    }
});

/**
 * @description : API to get the destination ID by the name of the destination
 * @route : /api/v1/destinations/getDestinationID
 * @access : Private
 * @payload : {type: "name"/"Id", input:"destinationName"/"destinationId"}
 */
export const getDestinationID = asyncHandler(async (req, res) => {
    const { type,input } = req.body;
    if (!type  || !input) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Please insert the right input"));
    }

    const destination = type=="name"? await Destination.findOne({ name:input.toLowerCase() }):await Destination.findById(input);

    if (!destination) {
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Destination not found"))
    }

    return res
        .status(200)
        .json(new ApiResponse(200, destination, "Destination data retrieved"));
})

/**
 * @description : API to add the point to the particular destination
 * @route : /api/v1/destinations/addPointToDestination
 * @access : Private
 * @payload
 */

export const addPointToDestination = asyncHandler(async (req, res) => {
  const { destinationName, pointName, coordinates } = req.body;

  if (!destinationName || !pointName || !coordinates) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Destination name, point name, and coordinates are required"));
  }

  // Parse coordinates if sent as stringified array
  const parsedCoordinates = Array.isArray(coordinates)
    ? coordinates.map(Number)
    : JSON.parse(coordinates).map(Number);

  if (parsedCoordinates.length !== 2) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Coordinates must be an array of two numbers [lng, lat]"));
  }

  const destination = await Destination.findOne({ name: destinationName.toLowerCase() });

  if (!destination) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Destination not found"));
  }

  // Handle image upload
  const imageFiles = req.files?.spotImages || [];
  const uploadedImages = await Promise.all(
    imageFiles.map(file => uploadOnCloudinary(file.path))
  );
  const imageURLs = uploadedImages.map(img => img.url);

  const newPoint = {
    name: pointName,
    coordinates: parsedCoordinates,
    images: imageURLs,
  };

  destination.points.push(newPoint);
  await destination.save();

  return res
    .status(200)
    .json(new ApiResponse(200, destination, "Point added successfully"));
});