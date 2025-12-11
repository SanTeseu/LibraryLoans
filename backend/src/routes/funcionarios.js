const router = require('express').Router();
const ctrl = require('../controllers/funcionariosController');
const authenticate = require('../middlewares/authenticate');
const role = require('../middlewares/role');

// listar (autenticado)
router.get('/', authenticate, ctrl.list);

// criar ( admin)
router.post('/', authenticate, role('admin'), ctrl.create);

// buscar
router.get('/:id', authenticate, ctrl.get);

// atualizar ( admin)
router.patch('/:id', authenticate, role('admin'), ctrl.update);

// deletar ( admin)
router.delete('/:id', authenticate, role('admin'), ctrl.remove);

module.exports = router;
