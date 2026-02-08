import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import AppError from "../utils/appError.js";

/* REGISTER */
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user._id,
    email: user.email,
  });
};

/* LOGIN */
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  res.json({
    _id: user._id,
    token: generateToken(user._id),
  });
};
