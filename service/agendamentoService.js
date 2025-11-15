const agendamentoDAO = require('../mysql/dao/agendamentoDao');
const usuarioDAO = require('../mysql/dao/usuarioDao');
const prestadorDAO = require('../mysql/dao/prestadorDao');

const { logError } = require('../util/logger');

class AgendamentoService {

    // CRIAR AGENDAMENTO
    async createAgendamento(dados) {
        try {
            // O ID que vem aqui é o ID do VÍNCULO (da tabela 'prestador'), ex: 1
            const { id_prestador, id_cliente, hora_inicio, hora_fim } = dados;

            // REGRA 1: Validar o VÍNCULO (e encontrar o usuário prestador)
            const linkPrestador = await prestadorDAO.findById(id_prestador);
            if (!linkPrestador) {
                throw new Error('Vínculo Prestador-Serviço (id_prestador) não encontrado.');
            }

            // Agora temos o ID do usuário real (ex: 2)
            const id_usuario_prestador = linkPrestador.id_usuario;

            // REGRA 2: Validar se os usuários existem (prestador e cliente)
            const prestador = await usuarioDAO.findById(id_usuario_prestador); // Busca o usuário 2
            const cliente = await usuarioDAO.findById(id_cliente);
            if (!prestador || !cliente) {
                throw new Error('Prestador ou Cliente não encontrado.');
            }

            // REGRA 3: Validar o tipo dos usuários (AGORA VAI DAR CERTO)
            if (prestador.flg_tipo !== 'P') {
                throw new Error('Usuário vinculado não é do tipo "P".');
            }
            if (cliente.flg_tipo !== 'C') {
                throw new Error('Usuário selecionado como cliente não é do tipo "C".');
            }

            // REGRA 4: Validar se horários são válidos (fim > início)
            if (new Date(hora_fim) <= new Date(hora_inicio)) {
                throw new Error('A hora de término deve ser maior que a hora de início.');
            }

            // REGRA 5 (CRÍTICA): Validar conflito
            // (Esta função já estava correta, pois ela checa pelo id_prestador do vínculo)
            const conflito = await agendamentoDAO.checkConflito(id_prestador, hora_inicio, hora_fim);
            if (conflito) {
                throw new Error(`Conflito de horário. O prestador já possui um agendamento (ID: ${conflito.id}) às ${conflito.hora_inicio}.`);
            }

            // Se passou em tudo, cria
            const novoAgendamento = await agendamentoDAO.create(dados);
            return agendamentoDAO.findById(novoAgendamento.id); // Retorna com includes

        } catch (error) {
            logError('Erro no AgendamentoService.createAgendamento', error);
            throw new Error(`Erro ao criar agendamento: ${error.message}`);
        }
    }

    // BUSCAR POR ID
    async getAgendamentoById(id) {
        try {
            const agendamento = await agendamentoDAO.findById(id);
            if (!agendamento) {
                throw new Error('Agendamento não encontrado.');
            }
            return agendamento;
        } catch (error) {
            logError('Erro no AgendamentoService.getAgendamentoById', error);
            throw new Error(error.message);
        }
    }

    // LISTAR AGENDAMENTOS DE UM PRESTADOR
    async getAgendamentosPorPrestador(id_prestador, dataInicio, dataFim) {
        try {
            // TODO: Validar formato das datas
            return await agendamentoDAO.findAllByPrestador(id_prestador, dataInicio, dataFim);
        } catch (error) {
            logError('Erro no AgendamentoService.getAgendamentosPorPrestador', error);
            throw new Error('Erro ao buscar agendamentos do prestador.');
        }
    }

    // LISTAR AGENDAMENTOS DE UM CLIENTE
    async getAgendamentosPorCliente(id_cliente) {
        try {
            return await agendamentoDAO.findAllByCliente(id_cliente);
        } catch (error) {
            logError('Erro no AgendamentoService.getAgendamentosPorCliente', error);
            throw new Error('Erro ao buscar agendamentos do cliente.');
        }
    }

    // ATUALIZAR (Mudar status ou reagendar)
    async updateAgendamento(id, dados) {
        try {
            const agendamento = await agendamentoDAO.findById(id);
            if (!agendamento) {
                throw new Error('Agendamento não encontrado.');
            }

            // Se estiver mudando o horário, precisa checar conflito novamente
            if (dados.hora_inicio || dados.hora_fim) {
                const hInicio = dados.hora_inicio || agendamento.hora_inicio;
                const hFim = dados.hora_fim || agendamento.hora_fim;
                const id_prestador = agendamento.id_prestador; // Pega o prestador do agendamento original

                const conflito = await agendamentoDAO.checkConflito(id_prestador, hInicio, hFim, id);
                if (conflito) {
                    throw new Error(`Conflito de horário ao re-agendar. O prestador já possui um agendamento (ID: ${conflito.id}).`);
                }
            }

            // Atualiza apenas os campos enviados
            await agendamentoDAO.update(id, dados);
            return agendamentoDAO.findById(id); // Retorna atualizado

        } catch (error) {
            logError('Erro no AgendamentoService.updateAgendamento', error);
            throw new Error(`Erro ao atualizar agendamento: ${error.message}`);
        }
    }

    // MUDAR O STATUS (Ex: 'cancelado' ou 'concluido')
    async updateStatus(id, status) {
        try {
            const agendamento = await agendamentoDAO.findById(id);
            if (!agendamento) {
                throw new Error('Agendamento não encontrado.');
            }
            // TODO: Validar se o status é um dos permitidos

            await agendamentoDAO.update(id, { status: status });
            return agendamentoDAO.findById(id);

        } catch (error) {
            logError('Erro no AgendamentoService.updateStatus', error);
            throw new Error(`Erro ao atualizar status: ${error.message}`);
        }
    }

    // DELETAR (Não recomendado, o ideal é cancelar)
    async deleteAgendamento(id) {
        try {
            const agendamento = await agendamentoDAO.findById(id);
            if (!agendamento) {
                throw new Error('Agendamento não encontrado.');
            }
            await agendamentoDAO.destroy(id);
            return { message: 'Agendamento deletado (não recomendado).' };
        } catch (error) {
            logError('Erro no AgendamentoService.deleteAgendamento', error);
            throw new Error(error.message);
        }
    }
}

module.exports = new AgendamentoService();