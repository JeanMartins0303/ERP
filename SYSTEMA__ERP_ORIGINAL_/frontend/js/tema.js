import CONFIG from './config.js';
import { notifications } from './notifications.js';

class ThemeManager {
  constructor() {
    this.themes = {
      light: {
        name: 'Claro',
        icon: 'fa-sun',
        colors: {
          primary: '#2196f3',
          secondary: '#607d8b',
          background: '#ffffff',
          surface: '#f5f5f5',
          text: '#333333',
          textSecondary: '#666666',
          border: '#e0e0e0',
          success: '#4caf50',
          warning: '#ff9800',
          error: '#f44336',
          info: '#2196f3'
        }
      },
      dark: {
        name: 'Escuro',
        icon: 'fa-moon',
        colors: {
          primary: '#64b5f6',
          secondary: '#90a4ae',
          background: '#121212',
          surface: '#1e1e1e',
          text: '#ffffff',
          textSecondary: '#b0b0b0',
          border: '#333333',
          success: '#81c784',
          warning: '#ffb74d',
          error: '#e57373',
          info: '#64b5f6'
        }
      },
      sepia: {
        name: 'Sépia',
        icon: 'fa-book',
        colors: {
          primary: '#795548',
          secondary: '#8d6e63',
          background: '#f4ecd8',
          surface: '#e6d5c3',
          text: '#5d4037',
          textSecondary: '#795548',
          border: '#d7ccc8',
          success: '#8d6e63',
          warning: '#a1887f',
          error: '#6d4c41',
          info: '#795548'
        }
      }
    };

    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupThemeToggle();
    this.setupThemeMenu();
  }

  setupThemeToggle() {
    const toggleBtn = document.getElementById('btnToggleTema');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
      });
    }
  }

  setupThemeMenu() {
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
      const themeMenu = document.createElement('div');
      themeMenu.className = 'theme-menu';
      themeMenu.innerHTML = `
                <button class="theme-menu-btn" aria-label="Opções de tema">
                    <i class="fas fa-palette"></i>
                </button>
                <div class="theme-menu-content">
                    ${Object.entries(this.themes)
    .map(
      ([key, theme]) => `
                        <button class="theme-option ${key === this.currentTheme ? 'active' : ''}" 
                                data-theme="${key}">
                            <i class="fas ${theme.icon}"></i>
                            ${theme.name}
                        </button>
                    `
    )
    .join('')}
                </div>
            `;
      headerActions.appendChild(themeMenu);

      // Configurar eventos do menu de temas
      const menuBtn = themeMenu.querySelector('.theme-menu-btn');
      const menuContent = themeMenu.querySelector('.theme-menu-content');

      menuBtn.addEventListener('click', () => {
        menuContent.classList.toggle('show');
      });

      document.addEventListener('click', e => {
        if (!themeMenu.contains(e.target)) {
          menuContent.classList.remove('show');
        }
      });

      // Configurar eventos dos botões de tema
      themeMenu.querySelectorAll('.theme-option').forEach(btn => {
        btn.addEventListener('click', () => {
          const theme = btn.dataset.theme;
          this.applyTheme(theme);
          menuContent.classList.remove('show');
        });
      });
    }
  }

  applyTheme(themeName) {
    if (!this.themes[themeName]) {
      return;
    }

    this.currentTheme = themeName;
    localStorage.setItem('theme', themeName);

    const theme = this.themes[themeName];
    const root = document.documentElement;

    // Aplicar cores do tema
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Atualizar classes do body
    document.body.className = themeName;

    // Atualizar ícone do botão de tema
    const toggleBtn = document.getElementById('btnToggleTema');
    if (toggleBtn) {
      toggleBtn.innerHTML = `<i class="fas ${theme.icon}"></i>`;
    }

    // Atualizar estado dos botões do menu de temas
    document.querySelectorAll('.theme-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === themeName);
    });

    // Notificar mudança de tema
    notifications.info(`Tema alterado para ${theme.name}`);
  }
}

// Inicializar o gerenciador de temas
const themeManager = new ThemeManager();

// Função para alternar entre temas claro e escuro
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Atualiza o atributo data-bs-theme
  html.setAttribute('data-bs-theme', newTheme);

  // Atualiza o ícone do botão
  const themeButton = document.getElementById('btnToggleTema');
  const themeIcon = themeButton.querySelector('i');

  if (newTheme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }

  // Salva a preferência do usuário
  localStorage.setItem('theme', newTheme);

  // Atualiza as cores dos gráficos
  updateChartsTheme(newTheme);
}

// Função para atualizar as cores dos gráficos
function updateChartsTheme(theme) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#f8f9fa' : '#212529';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  // Atualiza as opções padrão do Chart.js
  Chart.defaults.color = textColor;
  Chart.defaults.borderColor = gridColor;

  // Atualiza os gráficos existentes
  Object.values(Chart.instances).forEach(chart => {
    chart.options.scales.x.grid.color = gridColor;
    chart.options.scales.y.grid.color = gridColor;
    chart.update();
  });
}

// Função para inicializar o tema
function initTheme() {
  // Verifica se há uma preferência salva
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Define o tema inicial
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-bs-theme', initialTheme);

  // Atualiza o ícone do botão
  const themeButton = document.getElementById('btnToggleTema');
  const themeIcon = themeButton.querySelector('i');

  if (initialTheme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  // Inicializa os gráficos com o tema correto
  updateChartsTheme(initialTheme);

  // Adiciona o listener para mudanças no tema do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', newTheme);
      updateChartsTheme(newTheme);
    }
  });
}

// Adiciona o evento de clique ao botão de tema
document.getElementById('btnToggleTema').addEventListener('click', toggleTheme);

// Inicializa o tema quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initTheme);

// Exporta as funções e o objeto themeManager para uso em outros módulos
export { toggleTheme, updateChartsTheme, initTheme, themeManager as tema };
