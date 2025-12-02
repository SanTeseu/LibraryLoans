const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// mesmo padrão que você enviou
router.post("/login", authController.login);
router.post("/usuarios", authController.cadastrar);

module.exports = router;