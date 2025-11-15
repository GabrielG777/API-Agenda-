const servicoService = require('../service/servicoService');

// POST /servicos
async function criar(req, res) {
  try {
    const novoServico = await servicoService.createServico(req.body);
    res.status(201).json(novoServico);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// GET /servicos
async function listar(req, res) {
  try {
    const servicos = await servicoService.getAllServicos();
    res.status(200).json(servicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /servicos/:id
async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    const servico = await servicoService.getServicoById(id);
    res.status(200).json(servico);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// GET /servicos/empresa/:id_empresa
async function listarPorEmpresa(req, res) {
  try {
    const { id_empresa } = req.params;
    const servicos = await servicoService.getServicosByEmpresa(id_empresa);
    res.status(200).json(servicos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// PUT /servicos/:id
async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const servicoAtualizado = await servicoService.updateServico(id, req.body);
    res.status(200).json(servicoAtualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// DELETE /servicos/:id
async function deletar(req, res) {
  try {
    const { id } = req.params;
    const resultado = await servicoService.deleteServico(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  listarPorEmpresa,
  atualizar,
  deletar
};