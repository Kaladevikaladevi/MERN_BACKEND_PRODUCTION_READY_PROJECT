import express from "express";
import { getTasks } from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get user tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *       401:
 *         description: Unauthorized
 */


router.get("/", protect, getTasks);

export default router;