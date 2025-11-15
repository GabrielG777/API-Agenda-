// service/usuarioService.js
const usuarioDao = require('../mysql/dao/usuarioDAO');
const empresaDao = require('../mysql/dao/empresaDao'); // Para validar se a empresa existe
// const { logError } = require('../util/logger');
const bcrypt = require('bcryptjs'); // Para senhas

class UsuarioService {

  // Lógica para CRIAR
  async createUsuario(dados) {
    try {
      const { id_empresa, email, senha } = dados;

      // REGRA: Empresa deve existir
      const empresa = await empresaDao.findById(id_empresa);
      if (!empresa) {
        throw new Error('Empresa não encontrada.');
      }

      // REGRA: E-mail deve ser único
      const emailExiste = await usuarioDao.findByEmail(email);
      if (emailExiste) {
        throw new Error('Este e-mail já está em uso.');
      }

      // REGRA: Criptografar a senha
      const senhaHash = await bcrypt.hash(senha, 10); // 10 é o "salt"
      dados.senha = senhaHash;

      const novoUsuario = await usuarioDao.create(dados);

      // Nunca retorne a senha, mesmo criptografada
      novoUsuario.senha = undefined;
      return novoUsuario;

    } catch (error) {
      logError('Erro no UsuarioService.createUsuario', error);
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  // Lógica para LOGIN
  async login(email, senha) {
    try {
      // 1. Busca usuário pelo e-mail
      const usuario = await usuarioDao.findByEmail(email);
      if (!usuario) {
        throw new Error('Credenciais inválidas.'); // Erro genérico
      }

      // 2. Compara a senha enviada com a senha no banco
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        throw new Error('Credenciais inválidas.'); // Erro genérico
      }

      // 3. Sucesso! Retorna o usuário (sem a senha)
      // (Aqui você geraria um Token JWT no futuro)
      usuario.senha = undefined;
      return { 
        message: 'Login bem-sucedido!', 
        usuario: usuario,
        // token: '...' (futuramente)
      };

    } catch (error) {
      logError('Erro no UsuarioService.login', error);
      throw new Error(`Erro ao tentar login: ${error.message}`);
    }
  }

  // Lógica para LISTAR
  async getAllUsuarios() {
    try {
      const usuarios = await usuarioDao.findAll();
      // Remove a senha de todos os usuários da lista
      return usuarios.map(user => {
        user.senha = undefined;
        return user;
      });
    } catch (error) {
      logError('Erro no UsuarioService.getAllUsuarios', error);
      throw new Error(`Erro ao buscar usuários: ${error.message}`);
    }
  }

  // Lógica para BUSCAR POR ID
  async getUsuarioById(id) {
    try {
      const usuario = await usuarioDao.findById(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado.');
      }
      usuario.senha = undefined;
      return usuario;
    } catch (error) {
      logError('Erro no UsuarioService.getUsuarioById', error);
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  // Lógica para ATUALIZAR
  async updateUsuario(id, dados) {
    try {
      // Se a senha estiver sendo atualizada, criptografe-a
      if (dados.senha) {
        dados.senha = await bcrypt.hash(dados.senha, 10);
      }
      
      await usuarioDao.update(id, dados);
      
      return this.getUsuarioById(id); // Retorna os dados atualizados
    } catch (error) {
      logError('Erro no UsuarioService.updateUsuario', error);
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  // Lógica para DELETAR
  async deleteUsuario(id) {
    try {
      const usuario = await usuarioDao.findById(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado.');
      }
      
      await usuarioDao.destroy(id);
      return { message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      logError('Erro no UsuarioService.deleteUsuario', error);
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }
}

module.exports = new UsuarioService();