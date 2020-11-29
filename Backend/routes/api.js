const express = require("express");
const users = require("./users");
const course = require("./courses");
const topics = require("./topics");

const router = express.Router();

router.use('/users', users);
router.use('/topics', topics);
router.use('/courses', course);

router.use((req, res, next) => {
    const error = new Error("Url not found!");
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

module.exports = router;