const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa a conexão

const Empresa = sequelize.define('Empresa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING(20)
  },
  email: {
    type: DataTypes.STRING(100)
  },
  endereco: {
    type: DataTypes.TEXT
  },
  slug: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'empresas', // Nome exato da tabela no banco
  timestamps: false // Desativa 'createdAt' e 'updatedAt'
});

module.exports = Empresa;