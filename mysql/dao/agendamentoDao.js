const Agendamento = require('../model/agendamentoModel');
const Usuario = require('../model/usuarioModel');
const Empresa = require('../model/empresaModel');
const Prestador = require('../model/prestadorModel'); // <-- Importante
const Servico = require('../model/servicoModel'); // <-- Importante
const { Op } = require('sequelize');

class AgendamentoDAO {

  async create(dados) {
    return Agendamento.create(dados);
  }

  // FUNÇÃO CORRIGIDA (Causa do erro)
  async findById(id) {
    return Agendamento.findByPk(id, {
      include: [
        { model: Empresa, as: 'empresa', attributes: ['id', 'nome'] },
        { 
          model: Prestador, // O alias 'prestador' pertence ao Model 'Prestador'
          as: 'prestador',
          include: [ // E dentro dele, incluímos o usuário e o serviço
            { model: Usuario, as: 'usuario', attributes: ['id', 'nome', 'email'] },
            { model: Servico, as: 'servico', attributes: ['id', 'nome', 'preco'] }
          ]
        },
        { model: Usuario, as: 'cliente', attributes: ['id', 'nome', 'email'] }
      ]
    });
  }

  // Atualiza um agendamento
  async update(id, dados) {
    return Agendamento.update(dados, {
      where: { id: id }
    });
  }

  async destroy(id) {
    return Agendamento.destroy({
      where: { id: id }
    });
  }

  // --- Funções de Consulta Específicas (Corrigidas) ---

  // Busca agendamentos de um PRESTADOR (pelo ID do vínculo)
  async findAllByPrestador(id_prestador, dataInicio, dataFim) {
    return Agendamento.findAll({
      where: {
        id_prestador,
        hora_inicio: { [Op.between]: [dataInicio, dataFim] }
      },
      include: [
        { 
          model: Prestador, 
          as: 'prestador',
          include: [
            { model: Usuario, as: 'usuario', attributes: ['id', 'nome'] },
            { model: Servico, as: 'servico', attributes: ['id', 'nome'] }
          ]
        },
        { model: Usuario, as: 'cliente', attributes: ['id', 'nome'] },
        { model: Empresa, as: 'empresa', attributes: ['id', 'nome'] }
      ],
      order: [['hora_inicio', 'ASC']]
    });
  }

  // Busca agendamentos de um CLIENTE
  async findAllByCliente(id_cliente) {
    return Agendamento.findAll({
      where: { id_cliente },
      include: [
        { 
          model: Prestador, 
          as: 'prestador',
          include: [
            { model: Usuario, as: 'usuario', attributes: ['id', 'nome'] },
            { model: Servico, as: 'servico', attributes: ['id', 'nome'] }
          ]
        },
        { model: Empresa, as: 'empresa', attributes: ['id', 'nome'] }
      ],
      order: [['hora_inicio', 'DESC']]
    });
  }

  // --- Função de Validação (Já estava correta) ---
  async checkConflito(id_prestador, hora_inicio, hora_fim, agendamentoId = null) {
    
    const filtroConflito = {
      id_prestador,
      status: { [Op.ne]: 'cancelado' }, // Ignora horários cancelados
      hora_inicio: {
        [Op.lt]: hora_fim // Início do agendamento existente < Fim do novo
      },
      hora_fim: {
        [Op.gt]: hora_inicio // Fim do agendamento existente > Início do novo
      }
    };

    // Se estivermos ATUALIZANDO, temos que excluir o próprio agendamento
    if (agendamentoId) {
      filtroConflito.id = { [Op.ne]: agendamentoId };
    }

    const conflito = await Agendamento.findOne({
      where: filtroConflito
    });

    return conflito; // Retorna o agendamento conflitante se existir
  }
}

module.exports = new AgendamentoDAO();