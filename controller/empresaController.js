const empresaService = require('../service/empresaService');

// POST /empresas
async function criar(req, res) {
  try {
    const novaEmpresa = await empresaService.createEmpresa(req.body);
    res.status(201).json(novaEmpresa);
  } catch (error) {
    // 400 = Bad Request (ex: CNPJ duplicado)
    res.status(400).json({ error: error.message });
  }
}

// GET /empresas
async function listar(req, res) {
  try {
    const empresas = await empresaService.getAllEmpresas();
    res.status(200).json(empresas);
  } catch (error) {
    // 500 = Internal Server Error
    res.status(500).json({ error: error.message });
  }
}

// GET /empresas/:id
async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    const empresa = await empresaService.getEmpresaById(id);
    res.status(200).json(empresa);
  } catch (error) {
    // 404 = Not Found
    res.status(404).json({ error: error.message });
  }
}

// PUT /empresas/:id
async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const empresaAtualizada = await empresaService.updateEmpresa(id, req.body);
    res.status(200).json(empresaAtualizada);
  } catch (error) {
    if (error.message.includes('não encontrada')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message }); // Erro de validação
    }
  }
}

// DELETE /empresas/:id
async function deletar(req, res) {
  try {
    const { id } = req.params;
    const resultado = await empresaService.deleteEmpresa(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  deletar
};