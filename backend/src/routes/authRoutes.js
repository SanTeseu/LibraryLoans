const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const { login } = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/login", login);

module.exports = router;
