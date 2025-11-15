const servicoDAO = require('../mysql/dao/servicoDao');
const empresaDAO = require('../mysql/dao/empresaDao'); // Para validação
const { logError } = require('../util/logger');

class ServicoService {

  // CRIAR
  async createServico(dados) {
    try {
      const { id_empresa } = dados;

      // REGRA: A empresa informada deve existir
      const empresa = await empresaDAO.findById(id_empresa);
      if (!empresa) {
        throw new Error('Empresa não encontrada.');
      }

      const novoServico = await servicoDAO.create(dados);
      return novoServico;
    } catch (error) {
      logError('Erro no ServicoService.createServico', error);
      throw new Error(`Erro ao criar serviço: ${error.message}`);
    }
  }

  // LISTAR TODOS
  async getAllServicos() {
    try {
      return await servicoDAO.findAll();
    } catch (error) {
      logError('Erro no ServicoService.getAllServicos', error);
      throw new Error('Erro ao buscar serviços.');
    }
  }

  // BUSCAR POR ID
  async getServicoById(id) {
    try {
      const servico = await servicoDAO.findById(id);
      if (!servico) {
        throw new Error('Serviço não encontrado.');
      }
      return servico;
    } catch (error) {
      logError('Erro no ServicoService.getServicoById', error);
      throw new Error(error.message);
    }
  }

  // LISTAR POR EMPRESA
  async getServicosByEmpresa(id_empresa) {
    try {
      return await servicoDAO.findAllByEmpresaId(id_empresa);
    } catch (error) {
      logError('Erro no ServicoService.getServicosByEmpresa', error);
      throw new Error('Erro ao buscar serviços da empresa.');
    }
  }

  // ATUALIZAR
  async updateServico(id, dados) {
    try {
      // REGRA: Verifica se o serviço existe
      const servico = await servicoDAO.findById(id);
      if (!servico) {
        throw new Error('Serviço não encontrado para atualização.');
      }

      await servicoDAO.update(id, dados);
      return servicoDAO.findById(id); // Retorna dados atualizados
    } catch (error) {
      logError('Erro no ServicoService.updateServico', error);
      throw new Error(`Erro ao atualizar serviço: ${error.message}`);
    }
  }

  // DELETAR
  async deleteServico(id) {
    try {
      const servico = await servicoDAO.findById(id);
      if (!servico) {
        throw new Error('Serviço não encontrado para exclusão.');
      }
      
      // REGRA FUTURA: Não deixar deletar se houver agendamentos
      // ...

      await servicoDAO.destroy(id);
      return { message: 'Serviço deletado com sucesso.' };
    } catch (error) {
      logError('Erro no ServicoService.deleteServico', error);
      throw new Error(error.message);
    }
  }
}

module.exports = new ServicoService();