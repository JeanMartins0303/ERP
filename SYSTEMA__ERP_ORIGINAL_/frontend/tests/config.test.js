// Exemplo de uso: window.CONFIG.API_URL

describe('CONFIG Module', () => {
  test('should have required properties', () => {
    expect(window.CONFIG).toHaveProperty('API_URL');
    expect(window.CONFIG).toHaveProperty('APP_NAME');
    expect(window.CONFIG).toHaveProperty('VERSION');
    expect(window.CONFIG).toHaveProperty('THEME');
    expect(window.CONFIG).toHaveProperty('ROLES');
    expect(window.CONFIG).toHaveProperty('NOTIFICATIONS');
    expect(window.CONFIG).toHaveProperty('CACHE');
  });

  test('should have valid API_URL', () => {
    expect(window.CONFIG.API_URL).toBe('http://localhost:8080/api');
  });

  test('should have valid APP_NAME', () => {
    expect(window.CONFIG.APP_NAME).toBe('CorelSys ERP');
  });

  test('should have valid VERSION', () => {
    expect(window.CONFIG.VERSION).toBe('1.0.0');
  });

  test('should have theme configuration', () => {
    expect(window.CONFIG.THEME).toHaveProperty('LIGHT');
    expect(window.CONFIG.THEME).toHaveProperty('DARK');
    expect(window.CONFIG.THEME.LIGHT).toBe('light');
    expect(window.CONFIG.THEME.DARK).toBe('dark');
  });

  test('should have roles configuration', () => {
    expect(window.CONFIG.ROLES).toHaveProperty('ADMIN');
    expect(window.CONFIG.ROLES).toHaveProperty('MANAGER');
    expect(window.CONFIG.ROLES).toHaveProperty('USER');
  });

  test('should have notifications configuration', () => {
    expect(window.CONFIG.NOTIFICATIONS).toHaveProperty('POSITION');
    expect(window.CONFIG.NOTIFICATIONS).toHaveProperty('DURATION');
    expect(window.CONFIG.NOTIFICATIONS.POSITION).toBe('top-right');
    expect(window.CONFIG.NOTIFICATIONS.DURATION).toBe(5000);
  });

  test('should have cache configuration', () => {
    expect(window.CONFIG.CACHE).toHaveProperty('ENABLED');
    expect(window.CONFIG.CACHE).toHaveProperty('DURATION');
    expect(window.CONFIG.CACHE.ENABLED).toBe(true);
    expect(window.CONFIG.CACHE.DURATION).toBe(3600000);
  });
});
