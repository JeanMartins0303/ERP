import { notifications } from './notifications.js';

class Auth {
  constructor() {
    this.token = null;
    this.refreshToken = null;
    this.user = null;
    this.init();
  }

  init() {
    this.loadTokens();
    this.setupAuthInterceptor();
  }

  loadTokens() {
    this.token = localStorage.getItem('user-token');
    this.refreshToken = localStorage.getItem('user-refresh-token');

    if (this.token) {
      this.user = this.parseJwt(this.token);
      this.setupTokenRefresh();
    }
  }

  setupAuthInterceptor() {
    // Intercepta todas as requisições para adicionar o token
    const originalFetch = window.fetch;
    window.fetch = async(url, options = {}) => {
      if (this.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${this.token}`
        };
      }

      try {
        const response = await originalFetch(url, options);

        if (response.status === 401) {
          // Token expirado, tenta renovar
          const newToken = await this.refreshAccessToken();
          if (newToken) {
            // Repete a requisição com o novo token
            options.headers['Authorization'] = `Bearer ${newToken}`;
            return originalFetch(url, options);
          } else {
            // Falha ao renovar token, faz logout
            this.logout();
            throw new Error('Sessão expirada');
          }
        }

        return response;
      } catch (error) {
        throw error;
      }
    };
  }

  setupTokenRefresh() {
    if (this.token) {
      const tokenExp = this.user.exp * 1000; // Converte para milissegundos
      const now = Date.now();
      const timeUntilExpiry = tokenExp - now;

      // Renova o token 5 minutos antes de expirar
      if (timeUntilExpiry > 300000) {
        setTimeout(() => this.refreshAccessToken(), timeUntilExpiry - 300000);
      } else {
        this.refreshAccessToken();
      }
    }
  }

  async login(email, password) {
    try {
      const apiUrl = window.CONFIG ? window.CONFIG.utils.getApiUrl() : 'http://localhost:8080/api';
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();
      this.setTokens(data.token, data.refreshToken);
      this.user = this.parseJwt(data.token);

      if (window.notifications) {
        window.notifications.success('Login realizado com sucesso!');
      }
      return true;
    } catch (error) {
      if (window.notifications) {
        window.notifications.error(error.message || 'Erro ao realizar login');
      }
      return false;
    }
  }

  async logout() {
    try {
      if (this.token) {
        const apiUrl = window.CONFIG ? window.CONFIG.utils.getApiUrl() : 'http://localhost:8080/api';
        await fetch(`${apiUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      this.clearTokens();
      window.location.href = '/login.html';
    }
  }

  async refreshAccessToken() {
    try {
      if (!this.refreshToken) {
        throw new Error('Refresh token não disponível');
      }

      const apiUrl = window.CONFIG ? window.CONFIG.utils.getApiUrl() : 'http://localhost:8080/api';
      const response = await fetch(`${apiUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken: this.refreshToken })
      });

      if (!response.ok) {
        throw new Error('Falha ao renovar token');
      }

      const data = await response.json();
      this.setTokens(data.token, data.refreshToken);
      this.user = this.parseJwt(data.token);
      return data.token;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      this.clearTokens();
      return null;
    }
  }

  setTokens(token, refreshToken) {
    this.token = token;
    this.refreshToken = refreshToken;

    localStorage.setItem('user-token', token);
    localStorage.setItem('user-refresh-token', refreshToken);

    this.setupTokenRefresh();
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    this.user = null;

    localStorage.removeItem('user-token');
    localStorage.removeItem('user-refresh-token');
  }

  parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  hasPermission(permission) {
    if (!this.user || !this.user.permissions) {
      return false;
    }
    return this.user.permissions.includes(permission);
  }

  hasRole(role) {
    if (!this.user || !this.user.roles) {
      return false;
    }
    return this.user.roles.includes(role);
  }

  getUser() {
    return this.user;
  }

  getToken() {
    return this.token;
  }
}

// Inicializa o sistema de autenticação
const auth = new Auth();

// Disponibiliza globalmente
window.auth = auth;

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Auth, auth };
}
