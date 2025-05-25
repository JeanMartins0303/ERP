// scripts.js

// --- Dados simulados para testes (remova em produção) ---
localStorage.setItem('usuarioLogado', JSON.stringify({ nome: "João Silva" }));
localStorage.setItem('produtos', JSON.stringify([
  { id: 1, nome: "Produto A", preco: 10.50 },
  { id: 2, nome: "Produto B", preco: 25.00 },
  { id: 3, nome: "Produto C", preco: 7.75 }
]));
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

// --- Variável global para guardar a instância do gráfico ---
let graficoFinanceiro;

/**
 * Formata um número como moeda brasileira (BRL)
 * @param {number} valor 
 * @returns {string}
 */
function formatarReais(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * Retorna o mês (0-11) a partir de uma string de data
 * @param {string} dataStr 
 * @returns {number}
 */
function getMes(dataStr) {
  return new Date(dataStr).getMonth();
}

// --- Carregar nome do usuário no dashboard ---
function carregarUsuario() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const elementoNome = document.getElementById('usuarioLogadoNome');
  elementoNome.textContent = usuario?.nome ? `Olá, ${usuario.nome}!` : 'Olá, usuário!';
}

// --- Atualizar os cards de resumo ---
function atualizarCards() {
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const movimentacoes = JSON.parse(localStorage.getItem('movimentacoes')) || [];

  // Atualiza quantidade de produtos
  document.getElementById('produtos-count').textContent = produtos.length;

  // Calcula receita total (entradas)
  const receitaTotal = movimentacoes
    .filter(mov => mov.tipo === 'entrada')
    .reduce((acc, mov) => acc + mov.valor, 0);

  // Calcula despesa total (saídas)
  const despesaTotal = movimentacoes
    .filter(mov => mov.tipo === 'saida')
    .reduce((acc, mov) => acc + mov.valor, 0);

  document.getElementById('receita-total').textContent = formatarReais(receitaTotal);
  document.getElementById('despesas-total').textContent = formatarReais(despesaTotal);
}

// --- Criar ou atualizar o gráfico financeiro com Chart.js ---
function criarGrafico() {
  const movimentacoes = JSON.parse(localStorage.getItem('movimentacoes')) || [];
  const receitaPorMes = new Array(12).fill(0);
  const despesaPorMes = new Array(12).fill(0);

  movimentacoes.forEach(({ tipo, valor, data }) => {
    const mes = getMes(data);
    if (tipo === 'entrada') receitaPorMes[mes] += valor;
    else if (tipo === 'saida') despesaPorMes[mes] += valor;
  });

  const ctx = document.getElementById('graficoFinanceiro').getContext('2d');

  // Se o gráfico já existe, destrói antes de criar outro
  if (graficoFinanceiro) {
    graficoFinanceiro.destroy();
  }

  graficoFinanceiro = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'Receita',
          data: receitaPorMes,
          borderColor: 'var(--verde)', // variável CSS para cor verde
          backgroundColor: 'rgba(75, 181, 67, 0.2)',
          fill: true,
          tension: 0.3,
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          label: 'Despesa',
          data: despesaPorMes,
          borderColor: 'var(--vermelho)', // variável CSS para cor vermelha
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
}

// --- Toggle da sidebar para mobile ---
function ativarToggleSidebar() {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  if (!menuToggle || !sidebar) return;

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

// --- Mostrar toast de boas-vindas uma vez por sessão ---
function mostrarToastBemVindo() {
  if (sessionStorage.getItem('toastExibido')) return;

  Toastify({
    text: "Bem-vindo ao seu painel ERP!",
    duration: 3500,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #2980b9, #2ecc71)",
    stopOnFocus: true,
  }).showToast();

  sessionStorage.setItem('toastExibido', 'true');
}


document.addEventListener("DOMContentLoaded", () => {
  const btnToggleTema = document.getElementById("btnToggleTema");
  const body = document.body;
  const icon = btnToggleTema.querySelector("i");

  // Função para atualizar o tema e ícone de acordo com o estado
  function aplicarTema(temaEscuro) {
    if (temaEscuro) {
      body.classList.add("dark");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      body.classList.remove("dark");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }

  // Ler o tema salvo no localStorage (se houver)
  const temaSalvo = localStorage.getItem("temaEscuro") === "true";
  aplicarTema(temaSalvo);

  // Evento ao clicar no botão para alternar o tema
  btnToggleTema.addEventListener("click", () => {
    const modoAtual = body.classList.contains("dark");
    aplicarTema(!modoAtual);

    // Salvar o novo estado no localStorage
    localStorage.setItem("temaEscuro", !modoAtual);
  });
});















// --- Inicialização ao carregar a página ---
window.addEventListener('load', () => {
  carregarUsuario();
  atualizarCards();
  criarGrafico();
  ativarToggleSidebar();
  mostrarToastBemVindo();
});


