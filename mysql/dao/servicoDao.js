const Servico = require('../model/servicoModel');
const Empresa = require('../model/empresaModel'); // Para joins

class ServicoDao {

  async create(dados) {
    return Servico.create(dados);
  }

  async findAll() {
    // Inclui a empresa dona do serviço
    return Servico.findAll({
      include: [{ model: Empresa, as: 'empresa', attributes: ['id', 'nome'] }]
    });
  }

  async findById(id) {
    return Servico.findByPk(id, {
      include: [{ model: Empresa, as: 'empresa', attributes: ['id', 'nome'] }]
    });
  }

  // Útil: Encontrar todos os serviços de uma empresa
  async findAllByEmpresaId(id_empresa) {
    return Servico.findAll({ 
      where: { id_empresa },
      include: [{ model: Empresa, as: 'empresa', attributes: ['id', 'nome'] }]
    });
  }

  async update(id, dados) {
    return Servico.update(dados, {
      where: { id: id }
    });
  }

  async destroy(id) {
    return Servico.destroy({
      where: { id: id }
    });
  }
}

module.exports = new ServicoDao();