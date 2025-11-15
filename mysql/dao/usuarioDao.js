// mysql/dao/usuarioDao.js
const Usuario = require('../model/usuarioModel');
const Empresa = require('../model/empresaModel'); // Necessário para joins

class UsuarioDAO {

  // Cria um usuário    
  async create(dados) {
    return Usuario.create(dados);
  }

  // Busca todos os usuários
  async findAll() {
    // Exemplo de como incluir a empresa (join)
    return Usuario.findAll({
      include: [{ model: Empresa, as: 'empresa', attributes: ['id', 'nome'] }]
    });
  }

  // Busca um usuário pelo ID
  async findById(id) {
    return Usuario.findByPk(id, {
      include: [{ model: Empresa, as: 'empresa', attributes: ['id', 'nome'] }]
    });
  }
  
  // Busca um usuário pelo E-mail (essencial para login e validação)
  async findByEmail(email) {
    return Usuario.findOne({ where: { email } });
  }

  // Atualiza um usuário
  async update(id, dados) {
    return Usuario.update(dados, {
      where: { id: id }
    });
  }

  // Deleta um usuário
  async destroy(id) {
    return Usuario.destroy({
      where: { id: id }
    });
  }

  // (Opcional) Busca todos os usuários de uma empresa específica
  async findAllByEmpresaId(id_empresa) {
    return Usuario.findAll({ where: { id_empresa } });
  }
}

module.exports = new UsuarioDAO();