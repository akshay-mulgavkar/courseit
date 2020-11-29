const express = require("express");
const router = express.Router();

const controller = require("../controllers/users");

router.post("/login/admin", controller.loginAdmin);

module.exports = router;