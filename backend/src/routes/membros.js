const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const membros = require("../controllers/membrosController");
const { auth, adminOnly } = require("../middlewares/auth");

router.get("/", auth, membros.list);

router.post(
  "/",
  auth,
  adminOnly,
  [
    body("nome").notEmpty(),
    body("email").isEmail(),
    body("cpf").notEmpty()
  ],
  membros.create
);

router.put("/:id", auth, adminOnly, membros.update);

router.delete("/:id", auth, adminOnly, membros.remove);

module.exports = router;
