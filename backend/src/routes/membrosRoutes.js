const express = require("express");
const router = express.Router();
const membrosController = require("../controllers/membrosController");

// CRUD simples
router.get("/membros", membrosController.listar);
router.post("/membros", membrosController.criar);
router.put("/membros/:id", membrosController.atualizar);
router.delete("/membros/:id", membrosController.deletar);

module.exports = router;
