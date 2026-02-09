import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getTasks } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", protect, getTasks);

export default router;
