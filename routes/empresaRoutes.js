const express = require('express');
const router = express.Router();
const empresaController = require('../controller/empresaController');

// Rotas do CRUD de Empresas
router.post('/', empresaController.criar);
router.get('/', empresaController.listar);
router.get('/:id', empresaController.buscarPorId);
router.put('/:id', empresaController.atualizar);
router.delete('/:id', empresaController.deletar);

module.exports = router;