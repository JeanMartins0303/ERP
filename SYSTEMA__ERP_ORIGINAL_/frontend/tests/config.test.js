import CONFIG from '../js/config.js';

describe('CONFIG Module', () => {
  test('should have required properties', () => {
    expect(CONFIG).toHaveProperty('API_URL');
    expect(CONFIG).toHaveProperty('APP_NAME');
    expect(CONFIG).toHaveProperty('VERSION');
    expect(CONFIG).toHaveProperty('THEME');
    expect(CONFIG).toHaveProperty('ROLES');
    expect(CONFIG).toHaveProperty('NOTIFICATIONS');
    expect(CONFIG).toHaveProperty('CACHE');
  });

  test('should have valid API_URL', () => {
    expect(CONFIG.API_URL).toBe('http://localhost:8080/api');
  });

  test('should have valid APP_NAME', () => {
    expect(CONFIG.APP_NAME).toBe('CorelSys ERP');
  });

  test('should have valid VERSION', () => {
    expect(CONFIG.VERSION).toBe('1.0.0');
  });

  test('should have theme configuration', () => {
    expect(CONFIG.THEME).toHaveProperty('LIGHT');
    expect(CONFIG.THEME).toHaveProperty('DARK');
    expect(CONFIG.THEME.LIGHT).toBe('light');
    expect(CONFIG.THEME.DARK).toBe('dark');
  });

  test('should have roles configuration', () => {
    expect(CONFIG.ROLES).toHaveProperty('ADMIN');
    expect(CONFIG.ROLES).toHaveProperty('MANAGER');
    expect(CONFIG.ROLES).toHaveProperty('USER');
  });

  test('should have notifications configuration', () => {
    expect(CONFIG.NOTIFICATIONS).toHaveProperty('POSITION');
    expect(CONFIG.NOTIFICATIONS).toHaveProperty('DURATION');
    expect(CONFIG.NOTIFICATIONS.POSITION).toBe('top-right');
    expect(CONFIG.NOTIFICATIONS.DURATION).toBe(5000);
  });

  test('should have cache configuration', () => {
    expect(CONFIG.CACHE).toHaveProperty('ENABLED');
    expect(CONFIG.CACHE).toHaveProperty('DURATION');
    expect(CONFIG.CACHE.ENABLED).toBe(true);
    expect(CONFIG.CACHE.DURATION).toBe(3600000);
  });
});
