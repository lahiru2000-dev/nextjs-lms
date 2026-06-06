const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");

router.post("/register", userService.registerUser);

module.exports = router;