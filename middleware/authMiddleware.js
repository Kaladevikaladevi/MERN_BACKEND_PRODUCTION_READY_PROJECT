import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/appError.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return next(new AppError("Not authorized", 401));
    }
  } else {
    return next(new AppError("No token provided", 401));
  }
};

export default protect;
