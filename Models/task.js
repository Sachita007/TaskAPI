const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    required: [true, "Status is required."],
    enum: {
      values: ["todo", "in progress", "done"],
      message: 'Status must be either "todo," "in progress," or "done."',
    },
    default: "todo",
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function (value) {
        // Check if the provided date is after the current date
        return value > Date.now();
      },
      message: "Due date must be in the future.",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
