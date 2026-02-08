import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id;
      next();
    } catch (error) {
      return next(new AppError("Not authorized, token failed", 401));
    }
  } else {
    return next(new AppError("Not authorized, no token", 401));
  }
};

export default protect;   // ✅ THIS LINE IS REQUIRED
