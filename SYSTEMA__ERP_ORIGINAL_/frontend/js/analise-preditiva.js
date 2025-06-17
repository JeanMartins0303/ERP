import { dashboardData } from './dashboard-data.js';
import { notifications } from './notifications.js';

class AnalisePreditiva {
    constructor() {
        this.charts = new Map();
        this.init();
    }

    async init() {
        await this.loadPrevisoes();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const periodoSelect = document.getElementById('periodoPrevisao');
        if (periodoSelect) {
            periodoSelect.addEventListener('change', () => this.loadPrevisoes());
        }
    }

    async loadPrevisoes() {
        try {
            const [previsaoVendas, tendencias, recomendacoesEstoque, otimizacaoPrecos] = await Promise.all([
                dashboardData.getPrevisaoVendas(),
                dashboardData.getTendencias(),
                dashboardData.getRecomendacoesEstoque(),
                dashboardData.getOtimizacaoPrecos()
            ]);

            this.updatePrevisaoVendas(previsaoVendas);
            this.updateTendencias(tendencias);
            this.updateRecomendacoesEstoque(recomendacoesEstoque);
            this.updateOtimizacaoPrecos(otimizacaoPrecos);
        } catch (error) {
            notifications.error('Erro ao carregar análises preditivas');
            console.error('Erro ao carregar previsões:', error);
        }
    }

    updatePrevisaoVendas(data) {
        if (!data) return;

        const ctx = document.getElementById('graficoPrevisaoVendas');
        if (!ctx) return;

        if (this.charts.has('previsaoVendas')) {
            this.charts.get('previsaoVendas').destroy();
        }

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Vendas Reais',
                        data: data.vendasReais,
                        borderColor: '#2196F3',
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'Previsão',
                        data: data.previsao,
                        borderColor: '#FFC107',
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(context.raw)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => {
                                return new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                    maximumSignificantDigits: 3
                                }).format(value);
                            }
                        }
                    }
                }
            }
        });

        this.charts.set('previsaoVendas', chart);
    }

    updateTendencias(data) {
        if (!data) return;

        const container = document.getElementById('tendenciasContainer');
        if (!container) return;

        container.innerHTML = data.map(tendencia => `
            <div class="tendencia-card ${tendencia.tipo}">
                <div class="tendencia-header">
                    <i class="fas ${this.getTendenciaIcon(tendencia.tipo)}"></i>
                    <h4>${tendencia.titulo}</h4>
                </div>
                <p>${tendencia.descricao}</p>
                <div class="tendencia-metricas">
                    <div class="metrica">
                        <span class="label">Impacto:</span>
                        <span class="valor ${tendencia.impacto >= 0 ? 'positive' : 'negative'}">
                            ${tendencia.impacto >= 0 ? '+' : ''}${tendencia.impacto}%
                        </span>
                    </div>
                    <div class="metrica">
                        <span class="label">Confiança:</span>
                        <span class="valor">${tendencia.confianca}%</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateRecomendacoesEstoque(data) {
        if (!data) return;

        const container = document.getElementById('recomendacoesEstoqueContainer');
        if (!container) return;

        container.innerHTML = data.map(recomendacao => `
            <div class="recomendacao-card ${recomendacao.prioridade}">
                <div class="recomendacao-header">
                    <i class="fas fa-box"></i>
                    <h4>${recomendacao.produto}</h4>
                </div>
                <div class="recomendacao-detalhes">
                    <p>${recomendacao.descricao}</p>
                    <div class="metricas">
                        <div class="metrica">
                            <span class="label">Estoque Atual:</span>
                            <span class="valor">${recomendacao.estoqueAtual}</span>
                        </div>
                        <div class="metrica">
                            <span class="label">Recomendado:</span>
                            <span class="valor">${recomendacao.estoqueRecomendado}</span>
                        </div>
                    </div>
                </div>
                <button class="btn-recomendacao" onclick="executarRecomendacao('${recomendacao.id}')">
                    Executar Recomendação
                </button>
            </div>
        `).join('');
    }

    updateOtimizacaoPrecos(data) {
        if (!data) return;

        const container = document.getElementById('otimizacaoPrecosContainer');
        if (!container) return;

        container.innerHTML = data.map(otimizacao => `
            <div class="otimizacao-card">
                <div class="otimizacao-header">
                    <i class="fas fa-tag"></i>
                    <h4>${otimizacao.produto}</h4>
                </div>
                <div class="otimizacao-detalhes">
                    <div class="preco-atual">
                        <span class="label">Preço Atual:</span>
                        <span class="valor">${new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(otimizacao.precoAtual)}</span>
                    </div>
                    <div class="preco-recomendado">
                        <span class="label">Preço Recomendado:</span>
                        <span class="valor ${otimizacao.variacao >= 0 ? 'positive' : 'negative'}">
                            ${new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(otimizacao.precoRecomendado)}
                            <small>(${otimizacao.variacao >= 0 ? '+' : ''}${otimizacao.variacao}%)</small>
                        </span>
                    </div>
                    <div class="metricas">
                        <div class="metrica">
                            <span class="label">Elasticidade:</span>
                            <span class="valor">${otimizacao.elasticidade}</span>
                        </div>
                        <div class="metrica">
                            <span class="label">Margem Atual:</span>
                            <span class="valor">${otimizacao.margemAtual}%</span>
                        </div>
                        <div class="metrica">
                            <span class="label">Margem Projetada:</span>
                            <span class="valor">${otimizacao.margemProjetada}%</span>
                        </div>
                    </div>
                </div>
                <button class="btn-otimizacao" onclick="aplicarOtimizacao('${otimizacao.id}')">
                    Aplicar Otimização
                </button>
            </div>
        `).join('');
    }

    getTendenciaIcon(tipo) {
        const icons = {
            'crescimento': 'fa-chart-line',
            'sazonalidade': 'fa-calendar-alt',
            'comportamento': 'fa-users',
            'produto': 'fa-box'
        };
        return icons[tipo] || 'fa-chart-bar';
    }
}

// Inicializar análise preditiva
const analisePreditiva = new AnalisePreditiva(); 