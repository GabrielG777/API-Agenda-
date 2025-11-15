const Prestador = require('../model/prestadorModel');
const Usuario = require('../model/usuarioModel');
const Servico = require('../model/servicoModel');

class PrestadorDao {

  // Cria o link
  async create(dados) {
    return Prestador.create(dados);
  }

  // Remove o link
  async destroy(id) {
    return Prestador.destroy({
      where: { id: id }
    });
  }

  // Atualiza o link (ex: mudar a descrição)
  async update(id, dados) {
    return Prestador.update(dados, {
      where: { id: id }
    });
  }

  // Busca um link pelo ID
  async findById(id) {
    return Prestador.findByPk(id);
  }

  // Verifica se o link já existe
  async findLink(id_usuario, id_servico) {
    return Prestador.findOne({
      where: { id_usuario, id_servico }
    });
  }

  // Busca todos os serviços que um prestador (usuário) faz
  async findAllByPrestadorId(id_usuario) {
    return Prestador.findAll({
      where: { id_usuario },
      include: [
        { model: Servico, as: 'servico' },
        { model: Usuario, as: 'usuario', attributes: ['id', 'nome']}
      ]
    });
  }

  // Busca todos os prestadores (usuários) que fazem um serviço
  async findAllByServicoId(id_servico) {
    return Prestador.findAll({
      where: { id_servico },
      include: [
        { model: Usuario, as: 'usuario', attributes: ['id', 'nome'] },
        { model: Servico, as: 'servico' }
      ]
    });
  }
}

module.exports = new PrestadorDao();