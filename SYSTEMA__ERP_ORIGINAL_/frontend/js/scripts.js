// scripts.js

// --- Dados simulados para testes ---

// Simula usuário logado no localStorage
localStorage.setItem('usuarioLogado', JSON.stringify({
  nome: "João Silva"
}));

// Simula produtos no localStorage
localStorage.setItem('produtos', JSON.stringify([
  { id: 1, nome: "Produto A", preco: 10.50 },
  { id: 2, nome: "Produto B", preco: 25.00 },
  { id: 3, nome: "Produto C", preco: 7.75 }
]));

// Simula movimentações financeiras no localStorage
localStorage.setItem('movimentacoes', JSON.stringify([
  { id: 1, tipo: "entrada", valor: 1000, data: "2025-01-15" },
  { id: 2, tipo: "saida", valor: 200, data: "2025-01-20" },
  { id: 3, tipo: "entrada", valor: 1500, data: "2025-02-10" },
  { id: 4, tipo: "saida", valor: 700, data: "2025-02-25" },
  { id: 5, tipo: "entrada", valor: 1200, data: "2025-03-05" },
  { id: 6, tipo: "saida", valor: 300, data: "2025-03-15" },
  { id: 7, tipo: "entrada", valor: 900, data: "2025-04-12" },
  { id: 8, tipo: "saida", valor: 450, data: "2025-04-18" },
  { id: 9, tipo: "entrada", valor: 1300, data: "2025-05-07" },
  { id: 10, tipo: "saida", valor: 600, data: "2025-05-22" }
]));

// --- Funções auxiliares ---

function formatarReais(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getMes(dataStr) {
  return new Date(dataStr).getMonth();
}

// --- Carregar e exibir dados ---

// Usuário
const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
if (usuario && usuario.nome) {
  document.getElementById('usuarioLogadoNome').textContent = `Olá, ${usuario.nome}!`;
} else {
  document.getElementById('usuarioLogadoNome').textContent = 'Olá, usuário!';
}

// Produtos
const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
document.getElementById('produtos-count').textContent = produtos.length;

// Movimentações
const movimentacoes = JSON.parse(localStorage.getItem('movimentacoes')) || [];

const receitaPorMes = Array(12).fill(0);
const despesaPorMes = Array(12).fill(0);

movimentacoes.forEach(mov => {
  const mes = getMes(mov.data);
  if (mov.tipo === 'entrada') {
    receitaPorMes[mes] += mov.valor;
  } else if (mov.tipo === 'saida') {
    despesaPorMes[mes] += mov.valor;
  }
});

const receitaTotal = receitaPorMes.reduce((acc, val) => acc + val, 0);
const despesaTotal = despesaPorMes.reduce((acc, val) => acc + val, 0);

document.getElementById('receita-total').textContent = formatarReais(receitaTotal);
document.getElementById('despesas-total').textContent = formatarReais(despesaTotal);

// --- Gráfico Chart.js ---

const ctx = document.getElementById('graficoFinanceiro').getContext('2d');
const graficoFinanceiro = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ],
    datasets: [
      {
        label: 'Receita',
        data: receitaPorMes,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Despesa',
        data: despesaPorMes,
        borderColor: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: ctx => formatarReais(ctx.parsed.y)
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => formatarReais(value)
        }
      }
    }
  }



});
// --- TOAST DE BOAS-VINDAS ---

window.addEventListener('load', () => {
  carregarUsuario();
  atualizarCards();
  criarGrafico();

  Toastify({
    text: "Bem-vindo ao seu painel ERP!",
    duration: 3500,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #2980b9, #2ecc71)",
    stopOnFocus: true,
  }).showToast();
});



