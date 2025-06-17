import CONFIG from './config.js';

class Notifications {
    constructor() {
        this.notifications = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadNotifications();
    }

    setupEventListeners() {
        const notificationButton = document.querySelector('.btn-notification');
        if (notificationButton) {
            notificationButton.addEventListener('click', () => this.toggleNotificationsPanel());
        }
    }

    async loadNotifications() {
        try {
            const response = await fetch('/api/notifications');
            if (!response.ok) throw new Error('Erro ao carregar notificações');
            this.notifications = await response.json();
            this.updateNotificationBadge();
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
            this.notifications = this.getMockNotifications();
            this.updateNotificationBadge();
        }
    }

    updateNotificationBadge() {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const unreadCount = this.notifications.filter(n => !n.read).length;
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    toggleNotificationsPanel() {
        const panel = document.querySelector('.notifications-panel');
        if (!panel) {
            this.createNotificationsPanel();
        } else {
            panel.classList.toggle('active');
        }
    }

    createNotificationsPanel() {
        const panel = document.createElement('div');
        panel.className = 'notifications-panel';
        
        const header = document.createElement('div');
        header.className = 'notifications-header';
        header.innerHTML = `
            <h3>Notificações</h3>
            <button class="btn-mark-all-read">Marcar todas como lidas</button>
        `;

        const list = document.createElement('div');
        list.className = 'notifications-list';
        
        this.notifications.forEach(notification => {
            const item = this.createNotificationItem(notification);
            list.appendChild(item);
        });

        panel.appendChild(header);
        panel.appendChild(list);
        document.body.appendChild(panel);

        // Adicionar eventos
        const markAllReadButton = panel.querySelector('.btn-mark-all-read');
        if (markAllReadButton) {
            markAllReadButton.addEventListener('click', () => this.markAllAsRead());
        }

        panel.classList.add('active');
    }

    createNotificationItem(notification) {
        const item = document.createElement('div');
        item.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
        item.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${this.getNotificationIcon(notification.type)}"></i>
            </div>
            <div class="notification-content">
                <p class="notification-title">${notification.title}</p>
                <p class="notification-message">${notification.message}</p>
                <span class="notification-time">${this.formatTime(notification.timestamp)}</span>
            </div>
            ${!notification.read ? '<div class="notification-dot"></div>' : ''}
        `;

        item.addEventListener('click', () => this.handleNotificationClick(notification));
        return item;
    }

    getNotificationIcon(type) {
        const icons = {
            'info': 'fa-info-circle',
            'warning': 'fa-exclamation-triangle',
            'success': 'fa-check-circle',
            'error': 'fa-times-circle',
            'alert': 'fa-bell'
        };
        return icons[type] || 'fa-bell';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        // Menos de 1 minuto
        if (diff < 60000) {
            return 'Agora mesmo';
        }
        // Menos de 1 hora
        if (diff < 3600000) {
            const minutes = Math.floor(diff / 60000);
            return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
        }
        // Menos de 24 horas
        if (diff < 86400000) {
            const hours = Math.floor(diff / 3600000);
            return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
        }
        // Mais de 24 horas
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    async handleNotificationClick(notification) {
        if (!notification.read) {
            try {
                await this.markAsRead(notification.id);
                notification.read = true;
                this.updateNotificationBadge();
                this.updateNotificationItem(notification.id);
            } catch (error) {
                console.error('Erro ao marcar notificação como lida:', error);
            }
        }
    }

    async markAsRead(notificationId) {
        try {
            const response = await fetch(`/api/notifications/${notificationId}/read`, {
                method: 'POST'
            });
            if (!response.ok) throw new Error('Erro ao marcar notificação como lida');
        } catch (error) {
            console.error('Erro ao marcar notificação como lida:', error);
            throw error;
        }
    }

    async markAllAsRead() {
        try {
            const response = await fetch('/api/notifications/read-all', {
                method: 'POST'
            });
            if (!response.ok) throw new Error('Erro ao marcar todas as notificações como lidas');
            
            this.notifications.forEach(notification => {
                notification.read = true;
            });
            
            this.updateNotificationBadge();
            this.updateNotificationsList();
        } catch (error) {
            console.error('Erro ao marcar todas as notificações como lidas:', error);
        }
    }

    updateNotificationItem(notificationId) {
        const item = document.querySelector(`[data-notification-id="${notificationId}"]`);
        if (item) {
            item.classList.remove('unread');
            item.classList.add('read');
            const dot = item.querySelector('.notification-dot');
            if (dot) dot.remove();
        }
    }

    updateNotificationsList() {
        const list = document.querySelector('.notifications-list');
        if (list) {
            list.innerHTML = '';
            this.notifications.forEach(notification => {
                const item = this.createNotificationItem(notification);
                list.appendChild(item);
            });
        }
    }

    success(message) {
        this.showNotification('success', 'Sucesso', message);
    }

    error(message) {
        this.showNotification('error', 'Erro', message);
    }

    warning(message) {
        this.showNotification('warning', 'Aviso', message);
    }

    info(message) {
        this.showNotification('info', 'Informação', message);
    }

    showNotification(type, title, message) {
        const notification = document.createElement('div');
        notification.className = `toast-notification ${type}`;
        notification.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
            </div>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        // Adicionar evento de fechar
        const closeButton = notification.querySelector('.toast-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                notification.remove();
            });
        }

        // Auto remover após 5 segundos
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    getMockNotifications() {
        return [
            {
                id: '1',
                type: 'warning',
                title: 'Estoque Baixo',
                message: 'O produto "Smartphone XYZ" está com estoque abaixo do nível recomendado.',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                read: false
            },
            {
                id: '2',
                type: 'success',
                title: 'Meta Atingida',
                message: 'A meta de vendas do mês foi atingida com sucesso!',
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                read: false
            },
            {
                id: '3',
                type: 'info',
                title: 'Atualização do Sistema',
                message: 'Uma nova versão do sistema está disponível.',
                timestamp: new Date(Date.now() - 86400000).toISOString(),
                read: true
            }
        ];
    }
}

export const notifications = new Notifications(); 