import { ApiError } from "../utils/ApiError";



export const verifyUser = async (req, res, next) => {
    const {token} = req.cookies;
  try {
      if (!token) {
          return res.status(401).json(new ApiError(401, "Token is required"));
      }
      const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password -token");
      if (!user) {
          return res.status(401).json(new ApiError(401, "Invalid token"));
      }
      req.user = user;
      next();
  } catch (error) {
        return res.status(401).json(new ApiError(401, "Invalid token"));
  }
}
export const verifyAstrologer = async (req, res, next) => {
    const {token} = req.cookies;
  try {
      if (!token) {
          return res.status(401).json(new ApiError(401, "Token is required"));
      }
      const decoded = jwt.verify(token, process.env.ASTRO_JWT_SECRET);
      const astrologer = await Astrologer.findById(decoded.id).select("-password -token");
      if (!astrologer) {
          return res.status(401).json(new ApiError(401, "Invalid token"));
      }
      req.astrologer = astrologer;
      next();
  } catch (error) {
        return res.status(401).json(new ApiError(401, "Invalid token"));
  }
}
