import { dashboardData } from './dashboard-data.js';
import { notifications } from './notifications.js';

class Dashboard {
  constructor() {
    this.charts = new Map();
    this.currentPeriod = 'hoje';
    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.loadData();
    this.setupRefreshInterval();
  }

  setupEventListeners() {
    // Filtro de período
    const periodoSelect = document.getElementById('periodo');
    if (periodoSelect) {
      periodoSelect.addEventListener('change', e => {
        this.currentPeriod = e.target.value;
        this.toggleDateInputs(e.target.value === 'personalizado');
        this.loadData();
      });
    }

    // Filtros de data
    const dataInicio = document.getElementById('dataInicio');
    const dataFim = document.getElementById('dataFim');
    if (dataInicio && dataFim) {
      [dataInicio, dataFim].forEach(input => {
        input.addEventListener('change', () => this.loadData());
      });
    }

    // Botões de exportação
    const exportBtn = document.querySelector('button[onclick="exportarRelatorio()"]');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportarRelatorio());
    }

    const printBtn = document.querySelector('button[onclick="imprimirRelatorio()"]');
    if (printBtn) {
      printBtn.addEventListener('click', () => this.imprimirRelatorio());
    }
  }

  toggleDateInputs(show) {
    const filtroData = document.querySelector('.filtro-data');
    if (filtroData) {
      filtroData.style.display = show ? 'flex' : 'none';
    }
  }

  async loadData() {
    try {
      const [kpis, vendasCategoria, vendasPeriodo, produtosVendidos, alertas, metricas] = await Promise.all([
        dashboardData.getKPIs(),
        dashboardData.getVendasPorCategoria(this.currentPeriod),
        dashboardData.getVendasPorPeriodo(this.currentPeriod),
        dashboardData.getProdutosMaisVendidos(this.currentPeriod),
        dashboardData.getAlertas(),
        dashboardData.getMetricasOperacionais()
      ]);

      this.updateKPIs(kpis);
      this.updateVendasCategoriaChart(vendasCategoria);
      this.updateVendasPeriodoChart(vendasPeriodo);
      this.updateProdutosVendidosTable(produtosVendidos);
      this.updateAlertas(alertas);
      this.updateMetricasOperacionais(metricas);
    } catch (error) {
      notifications.error('Erro ao carregar dados do dashboard');
      console.error('Erro ao carregar dados:', error);
    }
  }

  updateKPIs(kpis) {
    if (!kpis) {
      return;
    }

    const elements = {
      vendasHoje: document.getElementById('vendasHoje'),
      ticketMedio: document.getElementById('ticketMedio'),
      taxaOcupacao: document.getElementById('taxaOcupacao'),
      produtosBaixoEstoque: document.getElementById('produtosBaixoEstoque')
    };

    Object.entries(elements).forEach(([key, element]) => {
      if (element && kpis[key]) {
        element.textContent = this.formatValue(key, kpis[key]);
      }
    });
  }

  formatValue(key, value) {
    switch (key) {
    case 'vendasHoje':
    case 'ticketMedio':
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    case 'taxaOcupacao':
      return `${value}%`;
    default:
      return value;
    }
  }

  updateVendasCategoriaChart(data) {
    if (!data) {
      return;
    }

    const ctx = document.getElementById('graficoVendasCategoria');
    if (!ctx) {
      return;
    }

    if (this.charts.has('vendasCategoria')) {
      this.charts.get('vendasCategoria').destroy();
    }

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#FF5722']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          },
          tooltip: {
            callbacks: {
              label: context => {
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(value)} (${percentage}%)`;
              }
            }
          }
        }
      }
    });

    this.charts.set('vendasCategoria', chart);
  }

  updateVendasPeriodoChart(data) {
    if (!data) {
      return;
    }

    const ctx = document.getElementById('graficoVendasPeriodo');
    if (!ctx) {
      return;
    }

    if (this.charts.has('vendasPeriodo')) {
      this.charts.get('vendasPeriodo').destroy();
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Vendas',
            data: data.values,
            borderColor: '#2196F3',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(33, 150, 243, 0.1)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: context => {
                return new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => {
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

    this.charts.set('vendasPeriodo', chart);
  }

  updateProdutosVendidosTable(data) {
    if (!data) {
      return;
    }

    const tbody = document.getElementById('corpoTabelaProdutos');
    if (!tbody) {
      return;
    }

    tbody.innerHTML = data
      .map(
        item => `
            <tr>
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>${new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(item.valorTotal)}</td>
                <td>
                    <span class="trend ${item.variacao >= 0 ? 'positive' : 'negative'}">
                        <i class="fas fa-arrow-${item.variacao >= 0 ? 'up' : 'down'}"></i>
                        ${Math.abs(item.variacao)}%
                    </span>
                </td>
            </tr>
        `
      )
      .join('');
  }

  updateAlertas(alertas) {
    if (!alertas) {
      return;
    }

    const container = document.getElementById('alertasContainer');
    if (!container) {
      return;
    }

    container.innerHTML = alertas
      .map(
        alerta => `
            <div class="alerta ${alerta.tipo}">
                <i class="fas ${this.getAlertaIcon(alerta.tipo)}"></i>
                <div class="alerta-conteudo">
                    <h4>${alerta.titulo}</h4>
                    <p>${alerta.mensagem}</p>
                </div>
                ${
  alerta.acao
    ? `
                    <button class="btn-alerta" onclick="${alerta.acao.funcao}">
                        ${alerta.acao.texto}
                    </button>
                `
    : ''
}
            </div>
        `
      )
      .join('');
  }

  getAlertaIcon(tipo) {
    const icons = {
      estoque: 'fa-box',
      venda: 'fa-chart-line',
      financeiro: 'fa-dollar-sign',
      sistema: 'fa-cog'
    };
    return icons[tipo] || 'fa-bell';
  }

  updateMetricasOperacionais(metricas) {
    if (!metricas) {
    }

    // Implementar atualização das métricas operacionais
    // (tempo médio de atendimento, taxa de ocupação, etc.)
  }

  setupRefreshInterval() {
    // Atualiza os dados a cada 5 minutos
    setInterval(() => this.loadData(), 5 * 60 * 1000);
  }

  async exportarRelatorio() {
    try {
      const response = await fetch(`${CONFIG.API_URL}/dashboard/exportar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          periodo: this.currentPeriod,
          dataInicio: document.getElementById('dataInicio')?.value,
          dataFim: document.getElementById('dataFim')?.value
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao exportar relatório');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-dashboard-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      notifications.success('Relatório exportado com sucesso');
    } catch (error) {
      notifications.error('Erro ao exportar relatório');
      console.error('Erro ao exportar:', error);
    }
  }

  imprimirRelatorio() {
    window.print();
  }
}

// Inicializar o dashboard
const dashboard = new Dashboard();
