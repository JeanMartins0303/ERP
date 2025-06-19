// Arquivo principal do sistema ERP
import './css/style.css';
import './css/theme.css';
import './css/notifications.css';
import './css/dashboard.css';

// Importar módulos principais
import CONFIG from './js/config.js';
import { notifications } from './js/notifications.js';
import { tema } from './js/tema.js';

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
  console.log(`${CONFIG.APP_NAME} v${CONFIG.VERSION} inicializado`);

  // Inicializar tema
  tema.init();

  // Inicializar notificações
  notifications.init();

  // Verificar se há erros de console
  if (CONFIG.DEBUG) {
    console.log('Modo debug ativado');
  }
});

// Exportar para uso global
window.CONFIG = CONFIG;
window.notifications = notifications;
window.tema = tema;
