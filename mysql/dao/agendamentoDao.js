const Agendamento = require('../model/agendamentoModel');
const Usuario = require('../model/usuarioModel');
const Empresa = require('../model/empresaModel');
const Prestador = require('../model/prestadorModel');   
const Servico = require('../model/servicoModel'); 
const { Op } = require('sequelize');

class AgendamentoDAO {

  async create(dados) {
    return Agendamento.create(dados);
  }

  async findById(id) {
    return Agendamento.findByPk(id, {
      include: [
        { model: Empresa, as: 'empresa', attributes: ['id', 'nome'] },
        { 
          model: Prestador, 
          as: 'prestador',
          include: [ 
            { model: Usuario, as: 'usuario', attributes: ['id', 'nome', 'email'] },
            { model: Servico, as: 'servico', attributes: ['id', 'nome', 'preco'] }
          ]
        },
        { model: Usuario, as: 'cliente', attributes: ['id', 'nome', 'email'] }
      ]
    });
  }

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

  async checkConflito(id_prestador, hora_inicio, hora_fim, agendamentoId = null) {
    
    const filtroConflito = {
      id_prestador,
      status: { [Op.ne]: 'cancelado' }, 
      hora_inicio: {
        [Op.lt]: hora_fim 
      },
      hora_fim: {
        [Op.gt]: hora_inicio 
      }
    };

    if (agendamentoId) {
      filtroConflito.id = { [Op.ne]: agendamentoId };
    }

    const conflito = await Agendamento.findOne({
      where: filtroConflito
    });

    return conflito; 
  }
}

module.exports = new AgendamentoDAO();