// controller/usuarioController.js
const usuarioService = require('../service/usuarioService');

// POST /usuarios
async function criar(req, res) {
  try {
    const novoUsuario = await usuarioService.createUsuario(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// POST /usuarios/login
async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const resultado = await usuarioService.login(email, senha);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(401).json({ error: error.message }); // 401 Não Autorizado
  }
}

// GET /usuarios
async function listar(req, res) {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /usuarios/:id
async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.getUsuarioById(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// PUT /usuarios/:id
async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const usuarioAtualizado = await usuarioService.updateUsuario(id, req.body);
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// DELETE /usuarios/:id
async function deletar(req, res) {
  try {
    const { id } = req.params;
    const resultado = await usuarioService.deleteUsuario(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  criar,
  login,
  listar,
  buscarPorId,
  atualizar,
  deletar
};