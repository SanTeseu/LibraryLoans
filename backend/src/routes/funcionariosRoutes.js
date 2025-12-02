const express = require("express");
const router = express.Router();
const funcionariosController = require("../controllers/funcionariosController");

// CRUD simples
router.get("/funcionarios", funcionariosController.listar);
router.post("/funcionarios", funcionariosController.criar);
router.put("/funcionarios/:id", funcionariosController.atualizar);
router.delete("/funcionarios/:id", funcionariosController.deletar);

module.exports = router;
