const express = require("express");
const router = express.Router();

const controller = require("../controllers/courses");

router.post("/", controller.addCourse);
router.patch("/", controller.editCourse);
router.delete("/", controller.deleteCourse);
router.get("/all", controller.getAllCourse);

module.exports = router;