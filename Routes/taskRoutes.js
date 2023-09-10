const express = require("express");
const userControllers = require("./../Controllers/userControllers");
const router = express.Router();
const taskControllers = require("./../Controllers/taskControllers");

router
  .route("/")
  .get(userControllers.protect, taskControllers.getAllTask)
  .post(userControllers.protect, taskControllers.addTask);
router
  .route("/:task")
  .get(userControllers.protect, taskControllers.getTask)
  .put(userControllers.protect, taskControllers.updateTask)
  .delete(userControllers.protect, taskControllers.deleteTask);

module.exports = router;
