const express = require("express");
const router = express.Router();
const emprestimosController = require("../controllers/emprestimosController");

// CRUD simples + rota especial para devolver
router.get("/emprestimos", emprestimosController.listar);
router.post("/emprestimos", emprestimosController.criar);
router.put("/emprestimos/:id/devolver", emprestimosController.devolver);
router.delete("/emprestimos/:id", emprestimosController.deletar);

module.exports = router;
