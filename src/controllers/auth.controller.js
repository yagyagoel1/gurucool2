import { Astrologer } from "../models/astrologer.model.js";
import { User } from "../models/user.model.js";
import { registerLoginSchema } from "../schemas/auth.schema.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const astrologerRegister = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const validate  = await registerLoginSchema({email,password});
    if(validate.error){
        return res.status(400).json(new ApiError(400,validate.error.details[0].message))
    }
    const astrologerExists = await Astrologer.findOne({ email });
    if(astrologerExists){
        return res.status(400).json(new ApiError(400,"astrologer already exists"))
    }
    const astrologer = await Astrologer.create({ email, password });
return res.status(201).json(new ApiResponse(201,"astrologer created successfully"))   
});

const astrologerLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const validate  = await registerLoginSchema({email,password});
    if(validate.error){
        return res.status(400).json(new ApiError(400,validate.error.details[0].message))
    }
    const astrologer = await Astrologer.findOne({ email }); 
    if (!astrologer) {
        return res.status(400).json(new ApiError(400,"Invalid credentials"))
    }
    const isMatch = await astrologer.checkPassword(password);
    if (!isMatch) {
        return res.status(400).json(new ApiError(400,"Invalid credentials"))
    }   
    const token = astrologer.generateToken();
    astrologer.token = token;
    await astrologer.save();
    return res.status(200).cookie("token",token,{httpOnly:true,
        secure : process.env.NODE_ENV === "production" ? true : false,
    }).json(new ApiResponse(200,"login successful",astrologer._id))
});
const userRegister = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const validate  = await registerLoginSchema({email,password});
    if(validate.error){
        return res.status(400).json(new ApiError(400,validate.error.details[0].message))
    }
    const userExists = await User.findOne({ email });
    if(userExists){
        return res.status(400).json(new ApiError(400,"user already exists"))
    }
    const user = await User.create({  email, password });
return res.status(201).json(new ApiResponse(201,"user created successfully",user._id))
});
const userLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const validate  = await registerLoginSchema({email,password});
    if(validate.error){
        return res.status(400).json(new ApiError(400,validate.error.details[0].message))
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json(new ApiError(400,"Invalid credentials"))
    }
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
        return res.status(400).json(new ApiError(400,"Invalid credentials"))
    }   
    const token = user.generateToken();
    user.token = token;
    await user.save();
    return res.status(200).cookie("token",token,{httpOnly:true,
        secure : process.env.NODE_ENV === "production" ? true : false,
    }).json(new ApiResponse(200,"login successful",user._id))
});
export { astrologerRegister, astrologerLogin, userRegister, userLogin };