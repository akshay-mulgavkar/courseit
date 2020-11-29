const express = require("express");
const router = express.Router();

const controller = require("../controllers/topics");

router.post("/", controller.addTopic);
router.patch("/", controller.editTopic);
router.delete("/", controller.deleteTopic);
router.get("/all", controller.getAllTopics);

module.exports = router;