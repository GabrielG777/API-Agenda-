const prestadorDAO = require('../mysql/dao/prestadorDao');
const usuarioDAO = require('../mysql/dao/usuarioDao');
const servicoDAO = require('../mysql/dao/servicoDao');
const { logError } = require('../util/logger');

class PrestadorService {

  // CRIAR (LINKAR)
  async linkarPrestador(dados) {
    try {
      const { id_usuario, id_servico, id_empresa } = dados;

      // REGRA 1: Usuário deve existir
      const usuario = await usuarioDAO.findById(id_usuario);
      if (!usuario) {
        throw new Error('Usuário não encontrado.');
      }

      // REGRA 2: Usuário deve ser do tipo 'P' (Prestador)
      if (usuario.flg_tipo !== 'P') {
        throw new Error('Este usuário não é do tipo Prestador.');
      }

      // REGRA 3: Serviço deve existir
      const servico = await servicoDAO.findById(id_servico);
      if (!servico) {
        throw new Error('Serviço não encontrado.');
      }

      // REGRA 4: Usuário e Serviço devem ser da mesma empresa (validação extra)
      if (usuario.id_empresa !== id_empresa || servico.id_empresa !== id_empresa) {
        throw new Error('Usuário e Serviço não pertencem à empresa informada.');
      }
      
      // REGRA 5: O link não pode existir
      const linkExiste = await prestadorDAO.findLink(id_usuario, id_servico);
      if (linkExiste) {
        throw new Error('Este prestador já está vinculado a este serviço.');
      }

      return await prestadorDAO.create(dados);

    } catch (error) {
      logError('Erro no PrestadorService.linkarPrestador', error);
      throw new Error(`Erro ao linkar prestador: ${error.message}`);
    }
  }

  // DELETAR (DESLINKAR)
  async deslinkarPrestador(id_link) {
    try {
      const link = await prestadorDAO.findById(id_link);
      if (!link) {
        throw new Error('Vínculo não encontrado.');
      }
      await prestadorDAO.destroy(id_link);
      return { message: 'Vínculo removido com sucesso.' };
    } catch (error) {
      logError('Erro no PrestadorService.deslinkarPrestador', error);
      throw new Error(error.message);
    }
  }
  
  // ATUALIZAR (ex: mudar descrição do link)
  async updateLink(id_link, dados) {
     try {
      const link = await prestadorDAO.findById(id_link);
      if (!link) {
        throw new Error('Vínculo não encontrado.');
      }
      await prestadorDAO.update(id_link, dados);
      return prestadorDAO.findById(id_link);
    } catch (error) {
      logError('Erro no PrestadorService.updateLink', error);
      throw new Error(error.message);
    }
  }

  // LISTAR serviços de um prestador
  async getServicosDoPrestador(id_usuario) {
    try {
      return await prestadorDAO.findAllByPrestadorId(id_usuario);
    } catch (error) {
      logError('Erro no PrestadorService.getServicosDoPrestador', error);
      throw new Error('Erro ao buscar serviços do prestador.');
    }
  }

  // LISTAR prestadores de um serviço
  async getPrestadoresDoServico(id_servico) {
    try {
      return await prestadorDAO.findAllByServicoId(id_servico);
    } catch (error) {
      logError('Erro no PrestadorService.getPrestadoresDoServico', error);
      throw new Error('Erro ao buscar prestadores do serviço.');
    }
  }
}

module.exports = new PrestadorService();