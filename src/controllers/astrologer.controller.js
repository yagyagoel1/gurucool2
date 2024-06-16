import { Astrologer } from "../models/astrologer.model";
import { ApiError } from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import  flowDistributionAlgorithm  from "../utils/flowDistributionAlgorithm";
export const toggleTopAstrologer = asyncHandler(async (req, res) => {
    const id = req.astrologer._id
     
        const astrologer = await Astrologer.findById(id);
        if(!topAstrologer){
            return res.status(400).json(new ApiError(400,"not a top astrologer"));

        }
        astrologer.toggleAstrologer = !astrologer.toggleAstrologer;
        await astrologer.save();
        res.status(200).json(new ApiResponse(200,"top astrologer status updated",astrologer))
    
});
   
export const addAstrologer = asyncHandler(async (req, res) => {

   try {
     flowDistributionAlgorithm.addAstrologer({...req.astrologer,currentConnection:0});
 
   } catch (error) {
    res.status(400).json(new ApiError(400,"astrologer is already added"));
   }
    res.status(200).json(new ApiResponse(200,"astrologer added successfully"))
});

