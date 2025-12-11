const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const role = require("../middlewares/role");
const controller = require("../controllers/emprestimosController");

router.get("/", authenticate, controller.listar);
router.post("/", authenticate, controller.criar);
router.put("/:id/devolver", authenticate, controller.devolver);
router.delete("/:id", authenticate, role("admin"), controller.remover);

module.exports = router;
