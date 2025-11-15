const empresaDAO = require('../mysql/dao/empresaDao');
// const { logError } = require('../util/logger');

/**
 * Classe de Serviço (Lógica de Negócios) para Empresas.
 */
class EmpresaService {
  
  // Lógica de negócios para CRIAR
  async createEmpresa(dados) {
    try {
      // REGRA DE NEGÓCIO: Validar se CNPJ ou Slug já existem
      const jaExiste = await empresaDAO.findByCnpjOrSlug(dados.cnpj, dados.slug);
      if (jaExiste) {
        throw new Error('CNPJ ou Slug já cadastrado.');
      }
      
      const novaEmpresa = await empresaDAO.create(dados);
      return novaEmpresa;
    } catch (error) {
      logError('Erro no EmpresaService.createEmpresa', error);
      throw new Error(error.message); // Propaga o erro
    }
  }

  // Lógica de negócios para LISTAR
  async getAllEmpresas() {
    try {
      return await empresaDAO.findAll();
    } catch (error) {
      logError('Erro no EmpresaService.getAllEmpresas', error);
      throw new Error('Erro ao buscar empresas.');
    }
  }

  // Lógica de negócios para BUSCAR POR ID
  async getEmpresaById(id) {
    try {
      const empresa = await empresaDAO.findById(id);
      
      // REGRA DE NEGÓCIO: Validar se a empresa foi encontrada
      if (!empresa) {
        throw new Error('Empresa não encontrada.');
      }
      return empresa;
    } catch (error) {
      logError('Erro no EmpresaService.getEmpresaById', error);
      throw new Error(error.message);
    }
  }

  // Lógica de negócios para ATUALIZAR
  async updateEmpresa(id, dados) {
    try {
      // REGRA: Verificar se a empresa existe
      const empresa = await empresaDAO.findById(id);
      if (!empresa) {
        throw new Error('Empresa não encontrada para atualização.');
      }

      await empresaDAO.update(id, dados);
      
      // Retorna os dados atualizados
      return empresaDAO.findById(id);
    } catch (error) {
      logError('Erro no EmpresaService.updateEmpresa', error);
      throw new Error(error.message);
    }
  }

  // Lógica de negócios para DELETAR
  async deleteEmpresa(id) {
    try {
      const empresa = await empresaDAO.findById(id);
      if (!empresa) {
        throw new Error('Empresa não encontrada para exclusão.');
      }
      
      await empresaDAO.destroy(id);
      return { message: 'Empresa deletada com sucesso.' };
    } catch (error) {
      logError('Erro no EmpresaService.deleteEmpresa', error);
      throw new Error(error.message);
    }
  }
}

module.exports = new EmpresaService();