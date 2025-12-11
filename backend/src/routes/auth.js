const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// todas as rotas de autenticação usam o controller novo
router.post("/login", authController.login);
router.get("/me", authController.me);

module.exports = router;
