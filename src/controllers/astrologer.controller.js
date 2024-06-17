import { Astrologer } from "../models/astrologer.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  flowDistributionAlgorithm  from "../utils/flowAlgorithm/flowAlgorithm.js";
export const toggleTopAstrologer = asyncHandler(async (req, res) => {
    const id = req.astrologer._id
     
        const astrologer = await Astrologer.findById(id);
        astrologer.toggleAstrologer = !astrologer.toggleAstrologer;
        await astrologer.save();
        res.status(200).json(new ApiResponse(200,"top astrologer status updated",astrologer._id))
    
});
   
export const addAstrologer = asyncHandler(async (req, res) => {


    req.astrologer._doc.currentConnections = 0;
    
 const astrologerAdded=   await flowDistributionAlgorithm.addAstrologer(req.astrologer);
    
    
    if(astrologerAdded==null)
    return res.status(400).json(new ApiError(400,"astrologer is already added"));

    return res.status(200).json(new ApiResponse(200,"astrologer added successfully",req.astrologer._id))

});

export const removeAstrologer = asyncHandler(async (req, res) => {
    const id = req.astrologer._id
    try {
     flowDistributionAlgorithm.removeAstrologer(id);
    } catch (error) {
     res.status(400).json(new ApiError(400,"astrologer is not available"));
    }
     res.status(200).json(new ApiResponse(200,"astrologer removed successfully",req.astrologer._id))
 });
