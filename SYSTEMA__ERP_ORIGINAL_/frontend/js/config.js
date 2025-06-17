const CONFIG = {
    API_URL: 'http://localhost:8080/api',
    APP_NAME: 'CorelSys ERP',
    VERSION: '1.0.0',
    THEME: {
        LIGHT: 'light',
        DARK: 'dark'
    },
    ROLES: {
        ADMIN: 'ADMIN',
        MANAGER: 'MANAGER',
        USER: 'USER'
    },
    NOTIFICATIONS: {
        POSITION: 'top-right',
        DURATION: 5000
    },
    CACHE: {
        ENABLED: true,
        DURATION: 3600000 // 1 hora em milissegundos
    }
};

export default CONFIG; 