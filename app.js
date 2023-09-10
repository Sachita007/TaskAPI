const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const taskRoutes = require("./Routes/taskRoutes");
const ErrorHandler = require("./Controllers/errorController");
const userRoutes = require("./Routes/userRoutes");
const app = express();

// Middleware for logging requests using Morgan
app.use(morgan("dev"));

// Middleware for handling CORS
app.use(cors());

app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.use(ErrorHandler);

module.exports = app;
