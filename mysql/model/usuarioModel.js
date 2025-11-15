// mysql/model/usuarioModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa a conexão
const Empresa = require('./empresaModel'); // Importa o modelo da Empresa

const Usuario = sequelize.define('Usuario', {
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
  senha: {
    type: DataTypes.STRING(255), // Senha criptografada (hash)
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(11)
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  flg_ativo: {
    type: DataTypes.CHAR(1),
    defaultValue: 'S'
  },
  flg_tipo: {
    type: DataTypes.CHAR(1), // C = Cliente, P = Prestador, A = Admin
    allowNull: false
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

// Define o relacionamento: Um Usuário pertence a uma Empresa
Usuario.belongsTo(Empresa, { foreignKey: 'id_empresa', as: 'empresa' });
// E uma Empresa pode ter muitos Usuários
Empresa.hasMany(Usuario, { foreignKey: 'id_empresa', as: 'usuarios' });

module.exports = Usuario;