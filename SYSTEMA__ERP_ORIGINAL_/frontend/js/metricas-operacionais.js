import { dashboardData } from './dashboard-data.js';
import { notifications } from './notifications.js';

class MetricasOperacionais {
    constructor() {
        this.charts = new Map();
        this.init();
    }

    async init() {
        await this.loadMetricas();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Atualizar métricas quando o período mudar
        const periodoSelect = document.getElementById('periodo');
        if (periodoSelect) {
            periodoSelect.addEventListener('change', () => this.loadMetricas());
        }
    }

    async loadMetricas() {
        try {
            const metricas = await dashboardData.getMetricasOperacionais();
            if (metricas) {
                this.updateMetricasCards(metricas);
                this.updateGraficoTempoAtendimento(metricas.tempoAtendimento);
                this.updateGraficoOcupacao(metricas.ocupacao);
                this.updateGraficoSatisfacao(metricas.satisfacao);
                this.updateGraficoDesempenho(metricas.desempenho);
            }
        } catch (error) {
            notifications.error('Erro ao carregar métricas operacionais');
            console.error('Erro ao carregar métricas:', error);
        }
    }

    updateMetricasCards(metricas) {
        const elements = {
            tempoMedioAtendimento: document.getElementById('tempoMedioAtendimento'),
            taxaOcupacaoAtual: document.getElementById('taxaOcupacaoAtual'),
            satisfacaoClientes: document.getElementById('satisfacaoClientes'),
            desempenhoFuncionarios: document.getElementById('desempenhoFuncionarios')
        };

        Object.entries(elements).forEach(([key, element]) => {
            if (element && metricas[key]) {
                element.textContent = this.formatValue(key, metricas[key]);
            }
        });
    }

    formatValue(key, value) {
        switch (key) {
            case 'tempoMedioAtendimento':
                return `${value} min`;
            case 'taxaOcupacaoAtual':
            case 'satisfacaoClientes':
                return `${value}%`;
            case 'desempenhoFuncionarios':
                return `${value}/10`;
            default:
                return value;
        }
    }

    updateGraficoTempoAtendimento(data) {
        const ctx = document.getElementById('graficoTempoAtendimento');
        if (!ctx) return;

        if (this.charts.has('tempoAtendimento')) {
            this.charts.get('tempoAtendimento').destroy();
        }

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Tempo Médio (min)',
                    data: data.values,
                    borderColor: '#2196F3',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(33, 150, 243, 0.1)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.raw} min`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Minutos'
                        }
                    }
                }
            }
        });

        this.charts.set('tempoAtendimento', chart);
    }

    updateGraficoOcupacao(data) {
        const ctx = document.getElementById('graficoOcupacao');
        if (!ctx) return;

        if (this.charts.has('ocupacao')) {
            this.charts.get('ocupacao').destroy();
        }

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Taxa de Ocupação',
                    data: data.values,
                    backgroundColor: '#4CAF50',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.raw}%`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Porcentagem'
                        }
                    }
                }
            }
        });

        this.charts.set('ocupacao', chart);
    }

    updateGraficoSatisfacao(data) {
        const ctx = document.getElementById('graficoSatisfacao');
        if (!ctx) return;

        if (this.charts.has('satisfacao')) {
            this.charts.get('satisfacao').destroy();
        }

        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Excelente', 'Bom', 'Regular', 'Ruim'],
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        '#4CAF50',
                        '#8BC34A',
                        '#FFC107',
                        '#F44336'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

        this.charts.set('satisfacao', chart);
    }

    updateGraficoDesempenho(data) {
        const ctx = document.getElementById('graficoDesempenho');
        if (!ctx) return;

        if (this.charts.has('desempenho')) {
            this.charts.get('desempenho').destroy();
        }

        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.labels,
                datasets: data.funcionarios.map(func => ({
                    label: func.nome,
                    data: func.metricas,
                    borderColor: this.getRandomColor(),
                    backgroundColor: this.getRandomColor(0.2)
                }))
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2
                        }
                    }
                }
            }
        });

        this.charts.set('desempenho', chart);
    }

    getRandomColor(alpha = 1) {
        const colors = [
            `rgba(33, 150, 243, ${alpha})`,  // Azul
            `rgba(76, 175, 80, ${alpha})`,   // Verde
            `rgba(255, 193, 7, ${alpha})`,   // Amarelo
            `rgba(156, 39, 176, ${alpha})`,  // Roxo
            `rgba(255, 87, 34, ${alpha})`    // Laranja
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Inicializar métricas operacionais
const metricasOperacionais = new MetricasOperacionais(); 