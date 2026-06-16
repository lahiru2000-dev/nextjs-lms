const express= require("express");
const router= express.Router();
const courseService= require("../services/course.service");

router.post("/courses", courseService.addCourse);

module.exports= router;