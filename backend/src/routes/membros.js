// src/routes/membros.js
const router = require('express').Router();
const ctrl = require('../controllers/membrosController');
const authenticate = require('../middlewares/authenticate');
const role = require('../middlewares/role');

router.get('/', authenticate, ctrl.list);
router.post('/', authenticate, role('admin'), ctrl.create);
router.get('/:id', authenticate, ctrl.get);
router.put('/:id', authenticate, role('admin'), ctrl.update);
router.delete('/:id', authenticate, role('admin'), ctrl.remove);
router.get('/:id/emprestimos', authenticate, ctrl.emprestimosDoMembro);

module.exports = router;
