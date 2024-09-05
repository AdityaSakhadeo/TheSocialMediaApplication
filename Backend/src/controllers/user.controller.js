import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:'registration sucessfully'
    })
})

const loginUser = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:'ok'
    })
})

export default registerUser;