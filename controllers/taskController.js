import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: tasks,
  });
};
