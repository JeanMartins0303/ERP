// Simulação inicial de dados (substituir pela integração backend posteriormente)
document.getElementById('produtos-count').innerText = 120;
document.getElementById('receita-total').innerText = 'R$ 15.450,00';
document.getElementById('despesas-total').innerText = 'R$ 3.250,00';

// Configuração do gráfico usando Chart.js
const ctx = document.getElementById('graficoFinanceiro').getContext('2d');
const grafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    datasets: [
      {
        label: 'Receita',
        data: [3200, 4100, 3900, 4800, 4450],
        backgroundColor: 'rgba(46, 204, 113, 0.7)', // Verde suave
        borderRadius: 6
      },
      {
        label: 'Despesas',
        data: [1000, 1200, 950, 1300, 1100],
        backgroundColor: 'rgba(231, 76, 60, 0.7)', // Vermelho suave
        borderRadius: 6
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Desempenho Financeiro Mensal',
        font: {
          size: 18,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 14
          }
        }
      }
    }
  }
});
