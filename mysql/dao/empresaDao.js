const Empresa = require('../model/empresaModel');
const { Op } = require('sequelize');

/**
 * Classe de Acesso a Dados (DAO) para a tabela 'empresas'.
 * É a única camada que fala diretamente com o Model (Sequelize).
 */
class EmpresaDao {
  
  // Cria uma nova empresa
  async create(dados) {
    return Empresa.create(dados);
  }

  // Busca todas as empresas
  async findAll() {
    return Empresa.findAll();
  }

  // Busca uma empresa pelo ID (Chave Primária)
  async findById(id) {
    return Empresa.findByPk(id);
  }

  // Busca uma empresa pelo CNPJ ou Slug (para validação)
  async findByCnpjOrSlug(cnpj, slug) {
    return Empresa.findOne({
      where: {
        [Op.or]: [{ cnpj: cnpj || null }, { slug: slug || null }]
      }
    });
  }

  // Atualiza uma empresa
  async update(id, dados) {
    return Empresa.update(dados, {
      where: { id: id }
    });
  }

  // Deleta uma empresa
  async destroy(id) {
    return Empresa.destroy({
      where: { id: id }
    });
  }
}

// Exportamos uma instância única da classe
module.exports = new EmpresaDao();