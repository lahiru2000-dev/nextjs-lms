const express= require("express");
const router= express.Router();
const courseService= require("../services/course.service");

router.post("/courses", courseService.addCourse);
router.get("/courses/:teacher_id", courseService.getCourseByTutor);

module.exports= router;