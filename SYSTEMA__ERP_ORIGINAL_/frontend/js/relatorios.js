document.addEventListener('DOMContentLoaded', () => {

    let relatoriosChartCategoria = null;
    let relatoriosChartTipos = null;

    /**
     * Cria uma configuração de gráfico padrão para os gráficos do Chart.js.
     * @param {boolean} isDarkMode - Se o tema escuro está ativo.
     * @returns {object} Configuração padrão do Chart.js.
     */
    function getChartDefaultOptions(isDarkMode) {
        const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        const textColor = isDarkMode ? '#f8fafc' : '#1f2937';
        const legendColor = isDarkMode ? '#94a3b8' : '#6b7280';

        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: legendColor,
                        font: {
                            size: 12,
                            family: "'Inter', sans-serif"
                        }
                    }
                },
                tooltip: {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    titleColor: textColor,
                    bodyColor: textColor,
                    borderColor: gridColor,
                    borderWidth: 1,
                    boxPadding: 8,
                    padding: 10,
                    cornerRadius: 6,
                    titleFont: { weight: 'bold' },
                    bodyFont: { family: "'Inter', sans-serif" }
                }
            },
            scales: {
                x: {
                    ticks: { color: textColor },
                    grid: { color: gridColor, drawOnChartArea: false },
                    border: { color: gridColor }
                },
                y: {
                    ticks: { color: textColor },
                    grid: { color: gridColor },
                    border: { display: false }
                },
            },
        };
    }
    
    /**
     * Inicializa os 4 gráficos de estatísticas no topo da página.
     */
    function initStatCharts() {
        const statChartIds = ['chartGerados', 'chartVendas', 'chartExportacoes', 'chartErros'];
        const statChartData = [
            { data: [5, 8, 3, 10, 7, 12], color: '#3b82f6' },
            { data: [10, 15, 8, 12, 18, 20], color: '#22c55e' },
            { data: [3, 5, 2, 7, 6, 9], color: '#f97316' },
            { data: [2, 1, 3, 0, 1, 2], color: '#ef4444' },
        ];

        statChartIds.forEach((id, index) => {
            const ctx = document.getElementById(id)?.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
                        datasets: [{
                            data: statChartData[index].data,
                            borderColor: statChartData[index].color,
                            backgroundColor: statChartData[index].color + '1A', // 10% opacity
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4,
                        }],
                    },
                    options: { 
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { x: { display: false }, y: { display: false } },
                        elements: { point: { radius: 0 } }
                    },
                });
            }
        });
    }

    /**
     * Inicializa os 2 gráficos principais no grid.
     */
    function initMainCharts(isDarkMode) {
        // Gráfico de Relatórios por Categoria (Barras)
        const categoriaCtx = document.getElementById('chartRelatoriosCategoria')?.getContext('2d');
        if (categoriaCtx) {
            relatoriosChartCategoria = new Chart(categoriaCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                        { label: 'Financeiro', data: [120, 150, 180, 220, 190, 250], backgroundColor: '#22c55e' },
                        { label: 'Vendas', data: [80, 100, 130, 150, 120, 180], backgroundColor: '#ef4444' },
                    ],
                },
                options: { 
                    ...getChartDefaultOptions(isDarkMode),
                    scales: { 
                        x: { ...getChartDefaultOptions(isDarkMode).scales.x, stacked: true },
                        y: { ...getChartDefaultOptions(isDarkMode).scales.y, stacked: true } 
                    }
                }
            });
        }

        // Gráfico de Tipos de Relatórios (Donut)
        const tiposCtx = document.getElementById('chartTiposRelatorios')?.getContext('2d');
        if (tiposCtx) {
            relatoriosChartTipos = new Chart(tiposCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Vendas', 'Financeiro', 'Estoque', 'Clientes'],
                    datasets: [{
                        data: [45, 25, 15, 15],
                        backgroundColor: ['#3b82f6', '#22c55e', '#f97316', '#ef4444'],
                        borderColor: isDarkMode ? '#1e293b' : '#ffffff',
                        borderWidth: 4,
                        hoverOffset: 8
                    }],
                },
                options: {
                    ...getChartDefaultOptions(isDarkMode),
                    cutout: '70%',
                    plugins: { 
                        ...getChartDefaultOptions(isDarkMode).plugins,
                        legend: { ...getChartDefaultOptions(isDarkMode).plugins.legend, display: true, position: 'right' }
                    }
                }
            });
        }
    }

    /**
     * Atualiza as cores dos gráficos principais quando o tema muda.
     * @param {boolean} isDarkMode 
     */
    function updateChartColors(isDarkMode) {
        if (relatoriosChartCategoria) {
            const options = getChartDefaultOptions(isDarkMode);
            relatoriosChartCategoria.options.scales.x = { ...options.scales.x, stacked: true };
            relatoriosChartCategoria.options.scales.y = { ...options.scales.y, stacked: true };
            relatoriosChartCategoria.options.plugins.legend.labels.color = options.plugins.legend.labels.color;
            relatoriosChartCategoria.update();
        }
        if (relatoriosChartTipos) {
            const options = getChartDefaultOptions(isDarkMode);
            relatoriosChartTipos.data.datasets[0].borderColor = isDarkMode ? '#1e293b' : '#ffffff';
            relatoriosChartTipos.options.plugins.legend.labels.color = options.plugins.legend.labels.color;
            relatoriosChartTipos.update();
        }
    }

    /**
     * Popula a tabela de histórico de relatórios com dados.
     */
    function populateReportsTable() {
        const tbody = document.getElementById('reportsTableBody');
        if (!tbody) return;

        const reports = [
            { date: '01/07/2024', type: 'Vendas', title: 'Relatório de Vendas - Junho', responsible: 'Admin', status: 'concluido' },
            { date: '30/06/2024', type: 'Financeiro', title: 'Fechamento Mensal', responsible: 'Ana Silva', status: 'concluido' },
            { date: '28/06/2024', type: 'Estoque', title: 'Inventário Semanal', responsible: 'Admin', status: 'erro' },
            { date: '25/06/2024', type: 'Clientes', title: 'Análise de Churn', responsible: 'Carlos Lima', status: 'concluido' },
            { date: '22/06/2024', type: 'Vendas', title: 'Vendas por Região - Q2', responsible: 'Admin', status: 'processando' },
        ];

        tbody.innerHTML = reports.map(report => `
            <tr>
                <td>${report.date}</td>
                <td>${report.type}</td>
                <td>${report.title}</td>
                <td>${report.responsible}</td>
                <td><span class="status-badge ${report.status}">${report.status.charAt(0).toUpperCase() + report.status.slice(1)}</span></td>
                <td class="action-buttons">
                    <button class="action-btn" title="Download"><i class="fas fa-download"></i></button>
                    <button class="action-btn" title="Visualizar"><i class="fas fa-eye"></i></button>
                    <button class="action-btn" title="Excluir"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Configura os ouvintes de eventos para interações do usuário no modal.
     */
    function setupEventListeners() {
        const newReportModal = document.getElementById('newReportModal');
        const openModalBtn = document.querySelector('[onclick="openNewReportModal()"]');
        const closeModalBtn = document.querySelector('.modal-close');

        if (openModalBtn) {
            openModalBtn.onclick = (e) => {
                e.preventDefault();
                newReportModal.style.display = 'block';
            };
        }
        
        if (closeModalBtn) {
            closeModalBtn.onclick = () => newReportModal.style.display = 'none';
        }
      
        window.onclick = (event) => {
            if (event.target == newReportModal) {
                newReportModal.style.display = 'none';
            }
        };
    }

    // --- INICIALIZAÇÃO ---

    const isInitialThemeDark = document.documentElement.getAttribute('data-theme') === 'dark';

    initStatCharts();
    initMainCharts(isInitialThemeDark);
    populateReportsTable();
    setupEventListeners();

    // Listener para mudança de tema, vindo do tema.js
    document.addEventListener('themeChanged', (e) => {
        updateChartColors(e.detail.theme === 'dark');
    });

});
