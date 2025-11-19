// index.js (na raiz do projeto 'Api/')
const express = require('express');
const sequelize = require('./mysql/database');
const cors = require('cors'); 

const empresaRoutes = require('./routes/empresaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const servicoRoutes = require('./routes/servicoRoutes'); 
const prestadorRoutes = require('./routes/prestadorRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes'); 

const app = express();
const port = 3000;

app.use(cors()); // cors parar conseguir acessar a API de outro domínio
app.use(express.json());

sequelize.sync()
  .then(() => {
    console.log('🔄 Modelos sincronizados com o banco de dados.');

    app.use('/api/empresas', empresaRoutes);
    app.use('/api/usuarios', usuarioRoutes);
    app.use('/api/servicos', servicoRoutes); 
    app.use('/api/prestador', prestadorRoutes); 
    app.use('/api/agendamentos', agendamentoRoutes); 

    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro ao sincronizar modelos:', err);
  });
