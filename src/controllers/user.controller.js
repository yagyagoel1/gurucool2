import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import flowDistributionAlgorithm from "../utils/flowAlgorithm/flowAlgorithm.js";

export const addUser = asyncHandler(async (req, res) => {
    

   try {
    const assignedAstrologer = flowDistributionAlgorithm.distributeUser(req.user);
   } catch (error) {
    res.status(400).json(new ApiError(400,"no astrologer is available"));
   }
    res.status(200).json(new ApiResponse(200,"you have been assigned an astrologer",assignedAstrologer));
});
