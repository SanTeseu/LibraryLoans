const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const LivrosController = require("../controllers/livrosController");

router.get("/", authenticate, LivrosController.listar);
router.post("/", authenticate, LivrosController.criar);
router.put("/:id", authenticate, LivrosController.atualizar);
router.delete("/:id", authenticate, LivrosController.deletar);

module.exports = router;
