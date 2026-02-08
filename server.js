import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import AppError from "./utils/appError.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

/* HANDLE INVALID ROUTES */
app.all("*", (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

/* GLOBAL ERROR HANDLER (ALWAYS LAST) */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
