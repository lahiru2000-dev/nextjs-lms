const express = require("express");
const router = express.Router();
const studentService = require("../services/student.service");

router.post("/add-student", studentService.addStudent);

module.exports = router;