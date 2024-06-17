import { Astrologer } from "../models/astrologer.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleAstrologerTop = asyncHandler(async (req, res) => {
    if(!req.headers.password || req.headers.password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json(new ApiError(401, "Unauthorized"));
    }
    const {id} = req.params;
    const astrologer = await Astrologer.findById(id);
    astrologer.isTopAstrologer = !astrologer.isTopAstrologer;
    await astrologer.save();
    res.status(200).json(new ApiResponse(200, "top astrologer status updated", astrologer._id));
    });

    export { toggleAstrologerTop}