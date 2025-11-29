// Arquivo: .../controller/agendamentoController.js

const agendamentoService = require('../service/agendamentoService');

// POST /agendamentos
async function criar(req, res) {
    try {
        const novoAgendamento = await agendamentoService.createAgendamento(req.body);
        res.status(201).json(novoAgendamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET /agendamentos/:id (Buscar por usuário)
async function buscarPorUsuario(req, res) {
    try {
        const { idUsuario } = req.params;

        const agendamentos = await agendamentoService.getAgendamentosByUserId(idUsuario);

        res.status(200).json(agendamentos);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// GET /agendamentos/prestador/:id_prestador
async function listarPorPrestador(req, res) {
    try {
        const { id_prestador } = req.params;
        const { dataInicio, dataFim } = req.query;

        if (!dataInicio || !dataFim) {
            return res.status(400).json({ error: 'dataInicio e dataFim são obrigatórios na query.' });
        }

        const agendamentos = await agendamentoService.getAgendamentosPorPrestador(
            id_prestador,
            dataInicio,
            dataFim
        );
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /agendamentos/cliente/:id_cliente
async function listarPorCliente(req, res) {
    try {
        const { id_cliente } = req.params;
        const agendamentos = await agendamentoService.getAgendamentosPorCliente(id_cliente);
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /agendamentos/:id (Atualização geral)
async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const agendamento = await agendamentoService.updateAgendamento(id, req.body);
        res.status(200).json(agendamento);
    } catch (error) {
        if (error.message.includes('não encontrado')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
}

// PATCH /agendamentos/:id/status (Atualização específica de status)
async function atualizarStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ error: 'O campo "status" é obrigatório.' });
        }

        const agendamento = await agendamentoService.updateStatus(id, status);
        res.status(200).json(agendamento);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// DELETE /agendamentos/:id
async function deletar(req, res) {
    try {
        const { id } = req.params;
        const resultado = await agendamentoService.deleteAgendamento(id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {
    criar,
    buscarPorUsuario,
    listarPorPrestador,
    listarPorCliente,
    atualizar,
    atualizarStatus,
    deletar
};