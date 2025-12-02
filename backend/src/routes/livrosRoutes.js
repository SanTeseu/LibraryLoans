const express = require("express");
const router = express.Router();
const livrosController = require("../controllers/livrosController");

// CRUD simples
router.get("/livros", livrosController.listar);
router.post("/livros", livrosController.criar);
router.put("/livros/:id", livrosController.atualizar);
router.delete("/livros/:id", livrosController.deletar);

module.exports = router;
