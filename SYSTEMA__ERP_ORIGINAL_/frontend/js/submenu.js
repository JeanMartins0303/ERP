// Sistema de Submenus para ERP
class SubmenuSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setActiveSubmenuItem();
    }

    setupEventListeners() {
        // Adicionar event listeners para todos os grupos de submenu
        document.addEventListener('click', (e) => {
            if (e.target.closest('.sidebar-nav-group-title')) {
                this.toggleSubmenu(e.target.closest('.sidebar-nav-group-title'));
            }
        });
    }

    toggleSubmenu(element) {
        const group = element.parentElement;
        const submenu = group.querySelector('.sidebar-nav-submenu');
        const arrow = element.querySelector('.dropdown-arrow');
        
        // Fechar todos os outros submenus
        const allGroups = document.querySelectorAll('.sidebar-nav-group');
        allGroups.forEach(otherGroup => {
            if (otherGroup !== group) {
                otherGroup.classList.remove('open');
                const otherArrow = otherGroup.querySelector('.dropdown-arrow');
                if (otherArrow) {
                    otherArrow.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        // Alternar submenu atual
        group.classList.toggle('open');
        
        // Atualizar rotação da seta
        if (group.classList.contains('open')) {
            arrow.style.transform = 'rotate(180deg)';
        } else {
            arrow.style.transform = 'rotate(0deg)';
        }
    }

    setActiveSubmenuItem() {
        const currentPage = window.location.pathname.split('/').pop();
        const submenuItems = document.querySelectorAll('.sidebar-nav-subitem');
        
        submenuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('active');
                // Abrir submenu pai
                const parentGroup = item.closest('.sidebar-nav-group');
                if (parentGroup) {
                    parentGroup.classList.add('open');
                    const arrow = parentGroup.querySelector('.dropdown-arrow');
                    if (arrow) {
                        arrow.style.transform = 'rotate(180deg)';
                    }
                }
            }
        });
    }

    // Método para expandir todos os submenus (útil para desenvolvimento)
    expandAll() {
        const allGroups = document.querySelectorAll('.sidebar-nav-group');
        allGroups.forEach(group => {
            group.classList.add('open');
            const arrow = group.querySelector('.dropdown-arrow');
            if (arrow) {
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    }

    // Método para colapsar todos os submenus
    collapseAll() {
        const allGroups = document.querySelectorAll('.sidebar-nav-group');
        allGroups.forEach(group => {
            group.classList.remove('open');
            const arrow = group.querySelector('.dropdown-arrow');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    }
}

// Inicializar sistema de submenus quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    window.submenuSystem = new SubmenuSystem();
});

// Função global para compatibilidade
function toggleSubmenu(element) {
    if (window.submenuSystem) {
        window.submenuSystem.toggleSubmenu(element);
    }
} 