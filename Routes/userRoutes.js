const express = require("express");
const router = express.Router();
const userControllers = require("./../Controllers/userControllers");

router.route("/register").post(userControllers.register);
router.route("/signin").post(userControllers.signIn);

module.exports = router;
