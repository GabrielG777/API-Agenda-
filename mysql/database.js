const { Sequelize } = require('sequelize');

// Configure com seus dados do MySQL
const sequelize = new Sequelize(
    'agendaplus',
    'root',
    'Gabriel.46139989809',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);


sequelize.authenticate()
    .then(() => console.log('✅ Conexão com o banco de dados estabelecida.'))
    .catch(err => console.error('❌ Não foi possível conectar ao banco de dados:', err));

module.exports = sequelize;
