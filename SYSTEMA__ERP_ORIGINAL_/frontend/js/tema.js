/**
 * Sistema de Gerenciamento de Tema
 * Gerencia temas claro/escuro com persistência e transições suaves
 */

class ThemeManager {
    constructor() {
    this.currentTheme = this.getStoredTheme() || 'light';
    this.themeToggle = null;
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
    this.setupSystemThemeListener();
    this.addThemeStyles();
  }

  getStoredTheme() {
    return localStorage.getItem('erp-theme');
  }

  setStoredTheme(theme) {
    localStorage.setItem('erp-theme', theme);
  }

  applyTheme(theme) {
    const root = document.documentElement;
    
    // Remove classes de tema anteriores
    root.classList.remove('theme-light', 'theme-dark');
    
    // Adiciona nova classe de tema
    root.classList.add(`theme-${theme}`);
    root.setAttribute('data-theme', theme);
    
    // Atualiza meta theme-color para mobile
    this.updateMetaThemeColor(theme);
    
    // Armazena preferência
    this.setStoredTheme(theme);
    this.currentTheme = theme;
    
    // Dispara evento customizado
    document.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme } 
    }));
  }

  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.content = theme === 'dark' ? '#232136' : '#ffffff';
    }

    setupThemeToggle() {
    // Procura por botões de toggle de tema
    const themeToggles = document.querySelectorAll('[data-theme-toggle]');
    
    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
                const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
                this.applyTheme(newTheme);
        this.updateToggleIcons();
      });
    });

    this.updateToggleIcons();
  }

  updateToggleIcons() {
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    const isDark = this.currentTheme === 'dark';
    
    toggles.forEach(toggle => {
      const icon = toggle.querySelector('i, .icon');
      if (icon) {
        if (isDark) {
          icon.className = icon.className.replace(/fa-moon|fa-sun/g, 'fa-sun');
          icon.textContent = '☀️';
        } else {
          icon.className = icon.className.replace(/fa-moon|fa-sun/g, 'fa-moon');
          icon.textContent = '🌙';
        }
      }
      
      // Atualiza aria-label
      toggle.setAttribute('aria-label', 
        isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'
      );
    });
  }

  setupSystemThemeListener() {
    // Detecta mudanças na preferência do sistema
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        // Só aplica se não houver tema salvo
        if (!this.getStoredTheme()) {
          const systemTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(systemTheme);
        }
      });
    }
  }

  addThemeStyles() {
    // Adiciona estilos para transições suaves
    const style = document.createElement('style');
    style.textContent = `
      * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      }
      
      .theme-transition {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .theme-toggle {
        position: relative;
        width: 48px;
        height: 24px;
        background: var(--border-color);
        border-radius: 12px;
        cursor: pointer;
        transition: background 0.3s ease;
        border: none;
        outline: none;
      }
      
      .theme-toggle:hover {
        background: var(--primary-color);
      }
      
      .theme-toggle::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background: var(--surface-color);
        border-radius: 50%;
        transition: transform 0.3s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
      
      .theme-dark .theme-toggle::before {
        transform: translateX(24px);
      }
      
      .theme-toggle-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        transition: opacity 0.3s ease;
      }
      
      .theme-toggle-icon.sun {
        left: 6px;
        opacity: 1;
      }
      
      .theme-dark .theme-toggle-icon.sun {
        opacity: 0;
      }
      
      .theme-toggle-icon.moon {
        right: 6px;
        opacity: 0;
      }
      
      .theme-dark .theme-toggle-icon.moon {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  // Métodos públicos
  toggle() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.updateToggleIcons();
  }

  setTheme(theme) {
    if (['light', 'dark'].includes(theme)) {
      this.applyTheme(theme);
      this.updateToggleIcons();
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  // Detecta se o sistema prefere tema escuro
  prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

// Inicializa o gerenciador de tema
const themeManager = new ThemeManager();

// Funções globais para compatibilidade
window.alternarTema = () => themeManager.toggle();
window.definirTema = (tema) => themeManager.setTheme(tema);
window.obterTema = () => themeManager.getCurrentTheme();

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ThemeManager, themeManager };
}
