// Arquivo: .../routes/agendamentoRoutes.js

const express = require('express');
const router = express.Router();
const agendamentoController = require('../controller/agendamentoController');

// "CRUD"
router.post('/', agendamentoController.criar);
router.get('/:idUsuario', agendamentoController.buscarPorUsuario);
router.put('/:id', agendamentoController.atualizar);
router.delete('/:id', agendamentoController.deletar);

// Rotas de consulta
router.get('/prestador/:id_prestador', agendamentoController.listarPorPrestador);
router.get('/cliente/:id_cliente', agendamentoController.listarPorCliente);

// Rota específica para mudar o status
router.patch('/:id/status', agendamentoController.atualizarStatus);

module.exports = router;