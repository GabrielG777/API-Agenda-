const prestadorService = require('../service/prestadorService');

// POST /prestador (Cria o VÍNCULO)
async function linkar(req, res) {
  try {
    const novoLink = await prestadorService.linkarPrestador(req.body);
    res.status(201).json(novoLink);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// DELETE /prestador/:id (Deleta o VÍNCULO)
async function deslinkar(req, res) {
  try {
    const { id } = req.params; // ID do *vínculo*, não do usuário
    const resultado = await prestadorService.deslinkarPrestador(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// PUT /prestador/:id (Atualiza o VÍNCULO)
async function atualizarLink(req, res) {
  try {
    const { id } = req.params; // ID do *vínculo*
    const linkAtualizado = await prestadorService.updateLink(id, req.body);
    res.status(200).json(linkAtualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// GET /prestador/usuario/:id_usuario (Lista serviços de um prestador)
async function listarServicosDoPrestador(req, res) {
  try {
    const { id_usuario } = req.params;
    const links = await prestadorService.getServicosDoPrestador(id_usuario);
    res.status(200).json(links);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// GET /prestador/servico/:id_servico (Lista prestadores de um serviço)
async function listarPrestadoresDoServico(req, res) {
  try {
    const { id_servico } = req.params;
    const links = await prestadorService.getPrestadoresDoServico(id_servico);
    res.status(200).json(links);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  linkar,
  deslinkar,
  atualizarLink,
  listarServicosDoPrestador,
  listarPrestadoresDoServico
};