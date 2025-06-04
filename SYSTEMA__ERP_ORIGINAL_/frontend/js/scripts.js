 // Alternar tema escuro/claro
    const btnToggleTema = document.getElementById('btnToggleTema');
    const body = document.body;

    btnToggleTema.addEventListener('click', () => {
      body.classList.toggle('dark');
      body.classList.toggle('light');

      if (body.classList.contains('dark')) {
        btnToggleTema.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('tema', 'dark');
      } else {
        btnToggleTema.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('tema', 'light');
      }
      atualizarCoresGrafico();
    });

    // Carregar tema salvo
    document.addEventListener('DOMContentLoaded', () => {
      const temaSalvo = localStorage.getItem('tema');
      if (temaSalvo === 'dark') {
        body.classList.add('dark');
        body.classList.remove('light');
        btnToggleTema.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        body.classList.add('light');
        body.classList.remove('dark');
        btnToggleTema.innerHTML = '<i class="fas fa-moon"></i>';
      }
      atualizarCoresGrafico();
      atualizarResumo();
    });

    // Atualizar dados dos cards (exemplo)
    function atualizarResumo() {
      document.getElementById('totalVendas').textContent = 'R$ 48.500,00';
      document.getElementById('totalProdutos').textContent = '280';
      document.getElementById('estoqueDisponivel').textContent = '1.150';
    }

    // Gráfico de vendas com Chart.js
    const ctx = document.getElementById('graficoVendas').getContext('2d');
    const graficoVendas = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['01', '05', '10', '15', '20', '25', '30'],
        datasets: [{
          label: 'Vendas (R$)',
          data: [1200, 1900, 3000, 2500, 3200, 2800, 3500],
          fill: false,
          borderColor: '#4c51bf',
          backgroundColor: '#4c51bf',
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          borderWidth: 3,
          


          backgroundColor: '#667eea',
          tension: 0.3,
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: '#4c51bf',
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: getComputedStyle(document.body).color,
              font: {
                size: 14,
                weight: '600',
              }
            }
          },
          tooltip: {
            backgroundColor: '#4c51bf',
            titleFont: { weight: '700' },
            bodyFont: { weight: '500' }
          }
        },
        scales: {
          x: {
            ticks: {
              color: getComputedStyle(document.body).color,
              font: { size: 13 }
            },
            grid: {
              color: 'transparent',
            }
          },
          y: {
            ticks: {
              color: getComputedStyle(document.body).color,
              font: { size: 13 },
              callback: value => `R$ ${value}`,
            },
            grid: {
              color: getComputedStyle(document.body).color === 'rgb(46, 58, 89)' ? '#e2e8f0' : '#2d3748',
              borderDash: [5, 5]
            },
            beginAtZero: true
          }
        }
      }
    });

    // Atualiza as cores do gráfico quando troca o tema
    function atualizarCoresGrafico() {
      const corTexto = getComputedStyle(document.body).color;
      graficoVendas.options.plugins.legend.labels.color = corTexto;
      graficoVendas.options.scales.x.ticks.color = corTexto;
      graficoVendas.options.scales.y.ticks.color = corTexto;
      graficoVendas.options.scales.y.grid.color =
        body.classList.contains('dark') ? '#2d3748' : '#e2e8f0';
      graficoVendas.update();
    }