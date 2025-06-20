/**
 * Arquivo principal do sistema ERP
 * Inicializa todas as funcionalidades globais
 */

// Importações
import './js/config.js';
import './js/tema.js';
import './js/notifications.js';
import './js/auth.js';

// Classe principal do sistema
class ERPSystem {
  constructor() {
    this.isInitialized = false;
    this.currentPage = null;
    this.init();
  }

  async init() {
    try {
      // Aguarda o DOM estar pronto
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setupSystem());
      } else {
        this.setupSystem();
      }
    } catch (error) {
      console.error('Erro ao inicializar o sistema ERP:', error);
      this.showError('Erro ao inicializar o sistema');
    }
  }

  setupSystem() {
    // Inicializa componentes globais
    this.setupTheme();
    this.setupLayout();
    this.setupNavigation();
    this.setupEventListeners();
    this.setupPerformanceMonitoring();
    
    // Marca como inicializado
    this.isInitialized = true;
    
    // Dispara evento de inicialização
    document.dispatchEvent(new CustomEvent('erpSystemReady'));
    
    console.log('Sistema ERP inicializado com sucesso');
  }

  setupTheme() {
    // O sistema de tema já é inicializado automaticamente pelo tema.js
    // Aqui apenas adicionamos listeners adicionais se necessário
    
    // Listener para mudanças de tema
    document.addEventListener('themeChanged', (event) => {
      this.onThemeChange(event.detail.theme);
    });
  }

  setupLayout() {
    // Configura o layout responsivo
    this.setupSidebarToggle();
    this.setupHeaderActions();
    this.setupMobileMenu();
  }

  setupSidebarToggle() {
    const sidebarToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('closed');
        
        // Salva preferência
        const isClosed = sidebar.classList.contains('closed');
        localStorage.setItem('sidebar-closed', isClosed);
      });
      
      // Restaura preferência salva
      const isClosed = localStorage.getItem('sidebar-closed') === 'true';
      if (isClosed) {
        sidebar.classList.add('closed');
      }
    }
  }

  setupHeaderActions() {
    // Configura ações do header
    this.setupThemeToggle();
    this.setupNotifications();
    this.setupUserMenu();
  }

  setupThemeToggle() {
    // Cria botão de toggle de tema se não existir
    const headerActions = document.querySelector('.header-actions');
    if (headerActions && !document.querySelector('[data-theme-toggle]')) {
      const themeToggle = document.createElement('button');
      themeToggle.className = 'header-action-btn';
      themeToggle.setAttribute('data-theme-toggle', '');
      themeToggle.setAttribute('aria-label', 'Alternar tema');
      themeToggle.innerHTML = `
        <span class="theme-toggle-icon sun">☀️</span>
        <span class="theme-toggle-icon moon">🌙</span>
      `;
      
      headerActions.insertBefore(themeToggle, headerActions.firstChild);
    }
  }

  setupNotifications() {
    // Configura sistema de notificações
    const notificationBtn = document.querySelector('[data-notifications-toggle]');
    if (notificationBtn) {
      notificationBtn.addEventListener('click', () => {
        this.toggleNotifications();
      });
    }
  }

  setupUserMenu() {
    // Configura menu do usuário
    const userMenuBtn = document.querySelector('[data-user-menu-toggle]');
    const userMenu = document.querySelector('.user-menu');
    
    if (userMenuBtn && userMenu) {
      userMenuBtn.addEventListener('click', () => {
        userMenu.classList.toggle('show');
      });
      
      // Fecha menu ao clicar fora
      document.addEventListener('click', (e) => {
        if (!userMenuBtn.contains(e.target) && !userMenu.contains(e.target)) {
          userMenu.classList.remove('show');
        }
      });
    }
  }

  setupMobileMenu() {
    // Configura menu mobile
    const mobileMenuBtn = document.querySelector('[data-mobile-menu-toggle]');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('show');
      });
      
      // Fecha menu ao clicar em um item
      const sidebarItems = sidebar.querySelectorAll('.sidebar-nav-item');
      sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            sidebar.classList.remove('show');
          }
        });
      });
    }
  }

  setupNavigation() {
    // Configura navegação
    this.setupActiveNavigation();
    this.setupBreadcrumbs();
  }

  setupActiveNavigation() {
    // Marca item ativo na navegação baseado na URL atual
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href && currentPath.includes(href.replace('.html', ''))) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  setupBreadcrumbs() {
    // Configura breadcrumbs dinâmicos
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    if (breadcrumbContainer) {
      this.updateBreadcrumbs();
    }
  }

  setupEventListeners() {
    // Event listeners globais
    this.setupGlobalEvents();
    this.setupKeyboardShortcuts();
  }

  setupGlobalEvents() {
    // Event listeners para funcionalidades globais
    
    // Logout
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-logout]')) {
        e.preventDefault();
        this.logout();
      }
    });
    
    // Confirmações
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-confirm]')) {
        const message = e.target.getAttribute('data-confirm');
        if (!confirm(message)) {
          e.preventDefault();
        }
      }
    });
    
    // Links externos
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[target="_blank"]')) {
        e.target.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  setupKeyboardShortcuts() {
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K: Busca
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openSearch();
      }
      
      // Ctrl/Cmd + T: Toggle tema
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        window.alternarTema();
      }
      
      // Ctrl/Cmd + B: Toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        document.querySelector('.menu-toggle')?.click();
      }
      
      // Escape: Fecha modais/menus
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  setupPerformanceMonitoring() {
    // Monitoramento de performance
    if (window.CONFIG.DEBUG.SHOW_PERFORMANCE) {
      this.setupPerformanceMonitoring();
    }
  }

  // Métodos de funcionalidade
  onThemeChange(theme) {
    // Atualiza elementos específicos quando o tema muda
    console.log(`Tema alterado para: ${theme}`);
    
    // Atualiza favicon se necessário
    this.updateFavicon(theme);
    
    // Atualiza meta tags
    this.updateMetaTags(theme);
  }

  updateFavicon(theme) {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = theme === 'dark' ? '/img/favicon-dark.png' : '/img/favicon.png';
    }
  }

  updateMetaTags(theme) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    }
  }

  toggleNotifications() {
    // Toggle painel de notificações
    const notificationsPanel = document.querySelector('.notifications-panel');
    if (notificationsPanel) {
      notificationsPanel.classList.toggle('show');
    }
  }

  openSearch() {
    // Abre busca global
    const searchModal = document.querySelector('#searchModal');
    if (searchModal) {
      // Implementar modal de busca
      console.log('Abrir busca global');
    }
  }

  closeAllModals() {
    // Fecha todos os modais e menus
    document.querySelectorAll('.modal.show, .dropdown.show, .menu.show').forEach(el => {
      el.classList.remove('show');
    });
  }

  updateBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    if (!breadcrumbContainer) return;
    
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(part => part);
    
    let breadcrumbHTML = '<a href="/">Início</a>';
    let currentPathBuilt = '';
    
    pathParts.forEach((part, index) => {
      currentPathBuilt += `/${part}`;
      const isLast = index === pathParts.length - 1;
      
      if (isLast) {
        breadcrumbHTML += ` <span class="separator">/</span> <span class="current">${this.formatBreadcrumbText(part)}</span>`;
      } else {
        breadcrumbHTML += ` <span class="separator">/</span> <a href="${currentPathBuilt}">${this.formatBreadcrumbText(part)}</a>`;
      }
    });
    
    breadcrumbContainer.innerHTML = breadcrumbHTML;
  }

  formatBreadcrumbText(text) {
    // Formata texto do breadcrumb
    return text
      .replace('.html', '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  async logout() {
    try {
      // Limpa dados da sessão
      localStorage.removeItem('user-token');
      localStorage.removeItem('user-data');
      
      // Redireciona para login
      window.location.href = '/login.html';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      this.showError('Erro ao fazer logout');
    }
  }

  showError(message) {
    // Mostra erro usando sistema de notificações
    if (window.notifications) {
      window.notifications.error(message);
    } else {
      alert(message);
    }
  }

  // Métodos utilitários
  getCurrentPage() {
    return this.currentPage;
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  isMobile() {
    return window.innerWidth <= 768;
  }

  isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }
}

// Inicializa o sistema
const erpSystem = new ERPSystem();

// Disponibiliza globalmente
window.erpSystem = erpSystem;

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ERPSystem, erpSystem };
}
 