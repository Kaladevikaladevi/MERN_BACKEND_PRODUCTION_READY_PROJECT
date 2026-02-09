import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = { user: req.user._id };

  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: "i" };
  }

  const tasks = await Task.find(query).limit(limit).skip(skip);
  const total = await Task.countDocuments(query);

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    tasks,
  });
};

export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(task);
};
