/**
 * Registra um erro no console.
 * @param {string} message - A mensagem de contexto do erro.
 * @param {Error} error - O objeto de erro capturado.
 */
function logError(message, error) {
  console.error(`[ERRO LOG]: ${message}`);
  console.error(error.stack || error);
  // Em produção, você pode enviar isso para um serviço de log
}

module.exports = { logError };