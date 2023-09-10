const Task = require("./../Models/task");
const AppError = require("./../Utils/appError");
const catchAsync = require("./../Utils/catchAsync");

// Get All task
exports.getAllTask = catchAsync(async (req, res, next) => {
  const data = await Task.find({ user: req.user._id });
  res.status(200).json({
    status: "Success",
    data: data,
  });
});

// Get Task By Task Id
exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.task);

  if (req.user._id.toString() !== task?.user.toString() || !task) {
    return next(new AppError("No task found with this ID", 404));
  }
  res.status(200).json({
    success: true,
    data: task,
  });
});

// Add Task
exports.addTask = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  req.body.user = userId;
  const response = await Task.create(req.body);

  res.status(200).json({
    success: true,
    data: response,
  });
});

//  Update Task
exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.task);

  if (req.user._id.toString() !== task?.user.toString() || !task) {
    return next(new AppError("No task found with this ID", 404));
  }

  delete req.body.user;
  const response = await Task.findByIdAndUpdate(req.params.task, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: "true",
    data: response,
  });
});

// Delete Task
exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.task);

  if (req.user._id.toString() !== task?.user.toString() || !task) {
    return next(new AppError("No task found with this ID", 404));
  }
  const response = await Task.findByIdAndDelete(req.params.task, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: "true",
    data: response,
  });
});
