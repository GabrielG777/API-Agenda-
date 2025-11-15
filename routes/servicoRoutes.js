const express = require('express');
const router = express.Router();
const servicoController = require('../controller/servicoController');

router.post('/', servicoController.criar);
router.get('/', servicoController.listar);
router.get('/:id', servicoController.buscarPorId);
router.get('/empresa/:id_empresa', servicoController.listarPorEmpresa);
router.put('/:id', servicoController.atualizar);
router.delete('/:id', servicoController.deletar);

module.exports = router;