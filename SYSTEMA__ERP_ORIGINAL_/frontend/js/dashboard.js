import { dashboardData } from './dashboard-data.js';
import { notifications } from './notifications.js';
import windowConfig from './config.js';

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
      const response = await fetch(`${window.CONFIG.API.BASE_URL}/dashboard/exportar`, {
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

// Mini-gráficos dos KPIs
function criarMiniChart(id, data, cor) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i + 1),
      datasets: [{
        data,
        borderColor: cor,
        backgroundColor: 'rgba(124,77,255,0.08)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.5,
        fill: true,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { display: false } },
      elements: { line: { borderJoinStyle: 'round' } },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

// Dados fictícios para demonstração
criarMiniChart('miniChartVendas', [10, 12, 14, 13, 15, 18, 20], '#7c4dff');
criarMiniChart('miniChartTicket', [5, 6, 7, 7, 8, 9, 10], '#00e5ff');
criarMiniChart('miniChartOcupacao', [80, 78, 75, 77, 74, 72, 70], '#ff5252');
criarMiniChart('miniChartEstoque', [2, 3, 1, 2, 0, 1, 0], '#ffd600');

// Gráfico de Vendas por Categoria
const ctxCategoria = document.getElementById('graficoVendasCategoria');
if (ctxCategoria) {
  new Chart(ctxCategoria, {
    type: 'doughnut',
    data: {
      labels: ['Bebidas', 'Comidas', 'Sobremesas', 'Outros'],
      datasets: [{
        data: [40, 30, 20, 10],
        backgroundColor: ['#7c4dff', '#00e5ff', '#ffd600', '#ff5252'],
        borderWidth: 2,
        borderColor: '#fff',
      }],
    },
    options: {
      plugins: {
        legend: { display: true, position: 'bottom', labels: { color: getComputedStyle(document.body).getPropertyValue('--text') } },
      },
      cutout: '70%',
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}
// Gráfico de Vendas por Período
const ctxPeriodo = document.getElementById('graficoVendasPeriodo');
if (ctxPeriodo) {
  new Chart(ctxPeriodo, {
    type: 'bar',
    data: {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [{
        label: 'Vendas',
        data: [120, 150, 170, 140, 180, 220, 200],
        backgroundColor: 'linear-gradient(120deg, #7c4dff, #00e5ff)',
        borderRadius: 12,
        barPercentage: 0.7,
        categoryPercentage: 0.6,
      }],
    },
    options: {
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary') },
        },
        y: {
          grid: { color: 'rgba(124,77,255,0.08)' },
          ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary') },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

// Tema dinâmico para Chart.js
function atualizarCoresCharts() {
  Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--text');
}
window.addEventListener('themechange', atualizarCoresCharts);

// Animação de entrada dos cards
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.kpi-card, .analytics-card, .table-card, .alert-card').forEach(card => {
    card.style.opacity = 0;
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = 'none';
    }, 200);
  });
});

// Exemplo de preenchimento da tabela de produtos
const corpoTabela = document.getElementById('corpoTabelaProdutos');
if (corpoTabela) {
  corpoTabela.innerHTML = `
    <tr><td>Hambúrguer</td><td>120</td><td>R$ 1.200,00</td><td><span class="kpi-badge kpi-up">+8%</span></td></tr>
    <tr><td>Pizza</td><td>90</td><td>R$ 1.050,00</td><td><span class="kpi-badge kpi-up">+5%</span></td></tr>
    <tr><td>Refrigerante</td><td>150</td><td>R$ 600,00</td><td><span class="kpi-badge kpi-down">-2%</span></td></tr>
    <tr><td>Sorvete</td><td>60</td><td>R$ 300,00</td><td><span class="kpi-badge kpi-up">+12%</span></td></tr>
  `;
}
// Alertas de exemplo
const alertasContainer = document.getElementById('alertasContainer');
if (alertasContainer) {
  alertasContainer.innerHTML = `
    <div><i class="fas fa-exclamation-triangle text-warning"></i> Estoque crítico: 2 produtos abaixo do mínimo.</div>
    <div><i class="fas fa-bell text-primary"></i> Nova venda realizada há 2 minutos.</div>
    <div><i class="fas fa-user-plus text-success"></i> Novo cliente cadastrado.</div>
  `;
}
