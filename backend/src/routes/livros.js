const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const livros = require("../controllers/livrosController");
const { auth, adminOnly } = require("../middlewares/auth");

// Rotas públicas protegidas
router.get("/", auth, livros.list);
router.get("/:id/disponibilidade", auth, livros.disponibilidade);

// Rotas admin (somente admin pode criar/editar/remover)
router.post(
  "/",
  auth,
  adminOnly,
  [
    body("titulo").notEmpty(),
    body("exemplares_total").isInt({ min: 1 })
  ],
  livros.create
);

router.put("/:id", auth, adminOnly, livros.update);

router.delete("/:id", auth, adminOnly, livros.remove);

module.exports = router;
