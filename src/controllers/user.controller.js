import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import flowDistributionAlgorithm from "../utils/flowAlgorithm/flowAlgorithm.js";

export const addUser = asyncHandler(async (req, res) => {


    const assignedAstrologer = await flowDistributionAlgorithm.distributeUser(req.user);

    if(assignedAstrologer!=null)
    return res.status(200).json(new ApiResponse(200,"you have been assigned an astrologer",assignedAstrologer));

  
    return res.status(400).json(new ApiError(400,"no astrologer is available"));
   
});
