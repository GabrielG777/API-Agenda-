const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Empresa = require('./empresaModel');

const Servico = sequelize.define('Servico', {
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
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  duracao: {
    type: DataTypes.INTEGER, // Tempo médio em minutos
    allowNull: false
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'servicos',
  timestamps: false
});

// Relacionamento: Um Serviço pertence a uma Empresa
Servico.belongsTo(Empresa, { foreignKey: 'id_empresa', as: 'empresa' });
// Relacionamento reverso (opcional, mas bom): Uma Empresa tem muitos Serviços
Empresa.hasMany(Servico, { foreignKey: 'id_empresa', as: 'servicos' });

module.exports = Servico;