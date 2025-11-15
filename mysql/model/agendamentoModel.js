const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Empresa = require('./empresaModel');
const Usuario = require('./usuarioModel');
const Prestador = require('./prestadorModel'); // <-- Essencial

const Agendamento = sequelize.define('Agendamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Empresa,
      key: 'id'
    }
  },
  id_prestador: { // <-- Corrigido
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Prestador, // Referencia a tabela 'prestador'
      key: 'id'
    }
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // Referencia a tabela 'usuarios'
      key: 'id'
    }
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2)
  },
  hora_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora_fim: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pendente'
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'agendamento',
  timestamps: false
});

// Define os relacionamentos com os apelidos (alias) corretos
Agendamento.belongsTo(Empresa, { foreignKey: 'id_empresa', as: 'empresa' });
Agendamento.belongsTo(Prestador, { foreignKey: 'id_prestador', as: 'prestador' }); // <-- Corrigido
Agendamento.belongsTo(Usuario, { foreignKey: 'id_cliente', as: 'cliente' });

// Relacionamento reverso (opcional, mas bom)
Usuario.hasMany(Agendamento, { foreignKey: 'id_cliente', as: 'agendamentosComoCliente' });
Prestador.hasMany(Agendamento, { foreignKey: 'id_prestador', as: 'agendamentos' });

module.exports = Agendamento;