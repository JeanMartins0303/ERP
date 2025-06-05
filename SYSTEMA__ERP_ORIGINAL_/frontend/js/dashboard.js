// Dados de exemplo (substituir por dados reais da API)
const dadosExemplo = {
  vendasHoje: 1250.75,
  mesasOcupadas: 8,
  produtosBaixoEstoque: 12,
  clientesHoje: 45,
  vendasPorCategoria: {
    labels: ['Alimentos', 'Bebidas', 'Mercadorias', 'Outros'],
    valores: [450.25, 380.50, 320.00, 100.00]
  },
  vendasPorPeriodo: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    valores: [12500, 13200, 14100, 13800, 14500, 15200]
  },
  produtosMaisVendidos: [
    { nome: 'X-Burger', quantidade: 45, valor: 2250.00 },
    { nome: 'Coca-Cola 350ml', quantidade: 120, valor: 600.00 },
    { nome: 'Batata Frita', quantidade: 38, valor: 950.00 },
    { nome: 'Milk Shake', quantidade: 25, valor: 625.00 }
  ]
};

// Configurações de cores e estilos
const configGraficos = {
  cores: {
    primaria: '#4f46e5',
    secundaria: '#6366f1',
    terciaria: '#818cf8',
    quaternaria: '#a5b4fc',
    sucesso: '#10b981',
    alerta: '#f59e0b',
    erro: '#ef4444',
    fundo: '#f9fafb',
    texto: '#1f2937',
    textoMuted: '#6b7280'
  },
  fontes: {
    familia: "'Inter', sans-serif",
    tamanho: 12
  }
};

// Inicialização dos gráficos
document.addEventListener('DOMContentLoaded', () => {
  inicializarGraficos();
  atualizarCards();
  atualizarTabelaProdutos();
  configurarEventListeners();
});

// Configurar gráficos
function inicializarGraficos() {
  // Gráfico de vendas por categoria
  const ctxCategoria = document.getElementById('graficoVendasCategoria').getContext('2d');
  new Chart(ctxCategoria, {
    type: 'doughnut',
    data: {
      labels: dadosExemplo.vendasPorCategoria.labels,
      datasets: [{
        data: dadosExemplo.vendasPorCategoria.valores,
        backgroundColor: [
          configGraficos.cores.primaria,
          configGraficos.cores.secundaria,
          configGraficos.cores.terciaria,
          configGraficos.cores.quaternaria
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: configGraficos.fontes.familia,
              size: configGraficos.fontes.tamanho
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: configGraficos.cores.texto,
          titleFont: {
            family: configGraficos.fontes.familia,
            size: configGraficos.fontes.tamanho + 2
          },
          bodyFont: {
            family: configGraficos.fontes.familia,
            size: configGraficos.fontes.tamanho
          },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              const valor = context.raw;
              return `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            }
          }
        }
      },
      cutout: '60%',
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });

  // Gráfico de vendas por período
  const ctxPeriodo = document.getElementById('graficoVendasPeriodo').getContext('2d');
  new Chart(ctxPeriodo, {
    type: 'line',
    data: {
      labels: dadosExemplo.vendasPorPeriodo.labels,
      datasets: [{
        label: 'Vendas (R$)',
        data: dadosExemplo.vendasPorPeriodo.valores,
        borderColor: configGraficos.cores.primaria,
        backgroundColor: configGraficos.cores.primaria + '20',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: configGraficos.cores.primaria,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: configGraficos.cores.texto,
          titleFont: {
            family: configGraficos.fontes.familia,
            size: configGraficos.fontes.tamanho + 2
          },
          bodyFont: {
            family: configGraficos.fontes.familia,
            size: configGraficos.fontes.tamanho
          },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              const valor = context.raw;
              return `R$ ${valor.toLocaleString('pt-BR')}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: configGraficos.cores.textoMuted + '20',
            drawBorder: false
          },
          ticks: {
            font: {
              family: configGraficos.fontes.familia,
              size: configGraficos.fontes.tamanho
            },
            color: configGraficos.cores.textoMuted,
            callback: (value) => `R$ ${value.toLocaleString('pt-BR')}`
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: configGraficos.fontes.familia,
              size: configGraficos.fontes.tamanho
            },
            color: configGraficos.cores.textoMuted
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  });
}

// Atualizar cards com dados
function atualizarCards() {
  document.getElementById('vendasHoje').textContent = formatarMoeda(dadosExemplo.vendasHoje);
  document.getElementById('mesasOcupadas').textContent = dadosExemplo.mesasOcupadas;
  document.getElementById('produtosBaixoEstoque').textContent = dadosExemplo.produtosBaixoEstoque;
  document.getElementById('clientesHoje').textContent = dadosExemplo.clientesHoje;
}

// Atualizar tabela de produtos mais vendidos
function atualizarTabelaProdutos() {
  const tbody = document.getElementById('corpoTabelaProdutos');
  tbody.innerHTML = '';

  dadosExemplo.produtosMaisVendidos.forEach(produto => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td>${produto.quantidade}</td>
      <td>${formatarMoeda(produto.valor)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Configurar event listeners
function configurarEventListeners() {
  // Toggle tema claro/escuro
  document.getElementById('btnToggleTema').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = document.querySelector('#btnToggleTema i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });

  // Menu mobile
  document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
  });

  // Atualizar dados a cada 5 minutos
  setInterval(atualizarDados, 300000);
}

// Função para atualizar dados (simulada)
function atualizarDados() {
  // Aqui você faria uma chamada à API para buscar dados atualizados
  console.log('Atualizando dados...');
  // atualizarCards();
  // atualizarTabelaProdutos();
  // atualizarGraficos();
}

// Função auxiliar para formatar valores monetários
function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

// Função para buscar dados da API (exemplo)
async function buscarDadosAPI() {
  try {
    const response = await fetch('/api/dashboard');
    const dados = await response.json();
    return dados;
  } catch (erro) {
    console.error('Erro ao buscar dados:', erro);
    return null;
  }
}

// Função para exportar relatório
function exportarRelatorio() {
  // Implementar lógica de exportação
  console.log('Exportando relatório...');
}

// Função para imprimir relatório
function imprimirRelatorio() {
  window.print();
}
