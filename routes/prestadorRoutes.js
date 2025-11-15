const express = require('express');
const router = express.Router();
const prestadorController = require('../controller/prestadorController');

// "CRUD" da tabela de ligação 'prestador'
router.post('/', prestadorController.linkar);
router.delete('/:id', prestadorController.deslinkar);
router.put('/:id', prestadorController.atualizarLink);

// Rotas de consulta
router.get('/usuario/:id_usuario', prestadorController.listarServicosDoPrestador);
router.get('/servico/:id_servico', prestadorController.listarPrestadoresDoServico);

module.exports = router;