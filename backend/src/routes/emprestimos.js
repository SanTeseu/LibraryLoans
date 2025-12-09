const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const emprestimos = require("../controllers/emprestimosController");
const { auth } = require("../middlewares/auth");

router.get("/", auth, emprestimos.list);
router.get("/atrasados", auth, emprestimos.atrasados);

router.post(
  "/",
  auth,
  [
    body("livroId").isInt(),
    body("membroId").isInt(),
    body("data_retirada").isISO8601(),
    body("data_devolucao_prevista").isISO8601()
  ],
  emprestimos.create
);

router.patch("/:id/devolver", auth, emprestimos.devolver);

module.exports = router;
