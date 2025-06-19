/**
 * Configurações Globais do Sistema ERP
 */

const CONFIG = {
  // Configurações da API
  API: {
    BASE_URL: 'http://localhost:8080/api',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000
  },

  // Configurações do Tema
  THEME: {
    DEFAULT: 'light',
    STORAGE_KEY: 'erp-theme',
    AUTO_DETECT: true,
    TRANSITION_DURATION: 300
  },

  // Configurações de Notificações
  NOTIFICATIONS: {
    AUTO_HIDE: true,
    AUTO_HIDE_DELAY: 5000,
    MAX_VISIBLE: 5,
    POSITION: 'top-right'
  },

  // Configurações de Paginação
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
    MAX_PAGES_SHOWN: 5
  },

  // Configurações de Validação
  VALIDATION: {
    DEBOUNCE_DELAY: 300,
    SHOW_ERRORS_ON_BLUR: true,
    SHOW_ERRORS_ON_SUBMIT: true
  },

  // Configurações de Upload
  UPLOAD: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    CHUNK_SIZE: 1024 * 1024, // 1MB
    RETRY_ATTEMPTS: 3
  },

  // Configurações de Cache
  CACHE: {
    ENABLED: true,
    TTL: 5 * 60 * 1000, // 5 minutos
    MAX_ITEMS: 100
  },

  // Configurações de Performance
  PERFORMANCE: {
    LAZY_LOADING: true,
    VIRTUAL_SCROLLING: true,
    DEBOUNCE_SEARCH: true,
    SEARCH_DELAY: 300
  },

  // Configurações de Segurança
  SECURITY: {
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_REQUIRE_SPECIAL: true,
    PASSWORD_REQUIRE_NUMBER: true,
    PASSWORD_REQUIRE_UPPERCASE: true
  },

  // Configurações de Localização
  LOCALE: {
    DEFAULT: 'pt-BR',
    DATE_FORMAT: 'DD/MM/YYYY',
    TIME_FORMAT: 'HH:mm',
    CURRENCY: 'BRL',
    DECIMAL_SEPARATOR: ',',
    THOUSANDS_SEPARATOR: '.'
  },

  // Configurações de Debug
  DEBUG: {
    ENABLED: false,
    LOG_LEVEL: 'error', // 'debug', 'info', 'warn', 'error'
    SHOW_PERFORMANCE: false
  }
};

// Funções utilitárias
CONFIG.utils = {
  // Verifica se está em modo de desenvolvimento
  isDevelopment: () => {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.port === '5173';
  },

  // Obtém a URL base da API baseada no ambiente
  getApiUrl: () => {
    if (CONFIG.utils.isDevelopment()) {
      return CONFIG.API.BASE_URL;
    }
    return window.location.origin + '/api';
  },

  // Formata data conforme configuração
  formatDate: (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString(CONFIG.LOCALE.DEFAULT);
  },

  // Formata moeda conforme configuração
  formatCurrency: (value) => {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat(CONFIG.LOCALE.DEFAULT, {
      style: 'currency',
      currency: CONFIG.LOCALE.CURRENCY
    }).format(value);
  },

  // Valida email
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Valida CPF
  isValidCPF: (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    
    return true;
  },

  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Deep clone object
  deepClone: (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => CONFIG.utils.deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = CONFIG.utils.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  },

  // Generate unique ID
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Sanitize HTML
  sanitizeHtml: (html) => {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  },

  // Get query parameters
  getQueryParams: () => {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },

  // Set query parameters
  setQueryParams: (params) => {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        url.searchParams.set(key, params[key]);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.replaceState({}, '', url);
  }
};

export default CONFIG;
window.CONFIG = CONFIG;
