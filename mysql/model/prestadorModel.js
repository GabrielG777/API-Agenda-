const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Empresa = require('./empresaModel');
const Usuario = require('./usuarioModel');
const Servico = require('./servicoModel');

const Prestador = sequelize.define('Prestador', {
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
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  id_servico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Servico,
      key: 'id'
    }
  },
  descricao: {
    type: DataTypes.TEXT // "Especialista em cortes"
  },
  duracao: {
    type: DataTypes.INTEGER // Duração específica do prestador (se for diferente do padrão)
  }
}, {
  tableName: 'prestador',
  timestamps: false,
  // Garante que um usuário não possa ser linkado ao mesmo serviço duas vezes
  indexes: [
    {
      unique: true,
      fields: ['id_usuario', 'id_servico']
    }
  ]
});

// Define os relacionamentos
Prestador.belongsTo(Empresa, { foreignKey: 'id_empresa', as: 'empresa' });
Prestador.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
Prestador.belongsTo(Servico, { foreignKey: 'id_servico', as: 'servico' });

// Relacionamentos "Muitos para Muitos" (através da tabela Prestador)
Usuario.belongsToMany(Servico, { through: Prestador, foreignKey: 'id_usuario' });
Servico.belongsToMany(Usuario, { through: Prestador, foreignKey: 'id_servico' });

module.exports = Prestador;