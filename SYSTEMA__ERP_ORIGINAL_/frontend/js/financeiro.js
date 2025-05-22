// --- Variáveis globais ---
const form = document.querySelector('#form-movimentacao');
const tabelaBody = document.querySelector('#tabela-movimentacoes tbody');
const saldoDisplay = document.querySelector('#saldo-total');
const filtroDataInicio = document.querySelector('#filtro-inicio');
const filtroDataFim = document.querySelector('#filtro-fim');
const btnFiltrar = document.querySelector('#btn-filtrar');
const btnLimparFiltro = document.querySelector('#btn-limpar-filtro');

let movimentacoes = [];
let chart = null;

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
  carregarMovimentacoes();
  atualizarTabela();
  atualizarSaldo();
  inicializarGrafico();
});

// --- Função para carregar movimentações do localStorage ---
function carregarMovimentacoes() {
  const dados = localStorage.getItem('movimentacoes');
  movimentacoes = dados ? JSON.parse(dados) : [];
}

// --- Função para salvar movimentações no localStorage ---
function salvarMovimentacoes() {
  localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));
}

// --- Função para validar dados do formulário ---
function validarFormulario(dados) {
  const { descricao, valor, tipo, data } = dados;
  if (!descricao.trim()) {
    alert('Descrição é obrigatória!');
    return false;
  }
  if (isNaN(valor) || valor <= 0) {
    alert('Valor deve ser um número positivo!');
    return false;
  }
  if (tipo !== 'entrada' && tipo !== 'saida') {
    alert('Tipo inválido!');
    return false;
  }
  if (!data) {
    alert('Data é obrigatória!');
    return false;
  }
  return true;
}

// --- Evento de submissão do formulário ---
form.addEventListener('submit', e => {
  e.preventDefault();

  const dados = {
    id: Date.now(),
    descricao: form.descricao.value,
    valor: parseFloat(form.valor.value),
    tipo: form.tipo.value,
    data: form.data.value,
  };

  if (!validarFormulario(dados)) return;

  movimentacoes.push(dados);
  salvarMovimentacoes();
  atualizarTabela();
  atualizarSaldo();
  atualizarGrafico();
  form.reset();
});

// --- Função para atualizar a tabela ---
function atualizarTabela(filtradas = null) {
  const lista = filtradas || movimentacoes;

  tabelaBody.innerHTML = '';
  if (lista.length === 0) {
    tabelaBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#666;">Nenhuma movimentação encontrada.</td></tr>`;
    return;
  }

  for (const mov of lista) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${formatarData(mov.data)}</td>
      <td>${mov.descricao}</td>
      <td>${mov.tipo === 'entrada' ? 'Entrada' : 'Saída'}</td>
      <td>${formatarValor(mov.valor, mov.tipo)}</td>
      <td>
        <button class="excluir-btn" data-id="${mov.id}" title="Excluir movimentação">&times;</button>
      </td>
    `;

    tabelaBody.appendChild(tr);
  }

  // Vincula evento para excluir
  document.querySelectorAll('.excluir-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.getAttribute('data-id'));
      excluirMovimentacao(id);
    });
  });
}

// --- Função para excluir movimentação ---
function excluirMovimentacao(id) {
  if (!confirm('Deseja realmente excluir esta movimentação?')) return;

  movimentacoes = movimentacoes.filter(mov => mov.id !== id);
  salvarMovimentacoes();
  atualizarTabela();
  atualizarSaldo();
  atualizarGrafico();
}

// --- Função para atualizar o saldo ---
function atualizarSaldo(filtradas = null) {
  const lista = filtradas || movimentacoes;

  const saldo = lista.reduce((acc, mov) => {
    return mov.tipo === 'entrada' ? acc + mov.valor : acc - mov.valor;
  }, 0);

  saldoDisplay.textContent = formatarValor(Math.abs(saldo), saldo >= 0 ? 'entrada' : 'saida');
  saldoDisplay.style.color = saldo >= 0 ? 'green' : 'red';
}

// --- Formatação de valores para moeda ---
function formatarValor(valor, tipo) {
  const valorFormatado = valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return tipo === 'saida' ? `- ${valorFormatado}` : valorFormatado;
}

// --- Formatação de data dd/mm/yyyy ---
function formatarData(dataISO) {
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR');
}

// --- Filtrar movimentações por data ---
btnFiltrar.addEventListener('click', () => {
  const inicio = filtroDataInicio.value;
  const fim = filtroDataFim.value;

  if (!inicio && !fim) {
    alert('Selecione ao menos uma data para filtrar.');
    return;
  }

  const filtradas = movimentacoes.filter(mov => {
    const dataMov = mov.data;
    if (inicio && fim) {
      return dataMov >= inicio && dataMov <= fim;
    }
    if (inicio) {
      return dataMov >= inicio;
    }
    if (fim) {
      return dataMov <= fim;
    }
  });

  atualizarTabela(filtradas);
  atualizarSaldo(filtradas);
  atualizarGrafico(filtradas);
});

// --- Botão para limpar filtro ---
btnLimparFiltro.addEventListener('click', () => {
  filtroDataInicio.value = '';
  filtroDataFim.value = '';
  atualizarTabela();
  atualizarSaldo();
  atualizarGrafico();
});

// --- Inicializa gráfico com Chart.js ---
function inicializarGrafico() {
  const ctx = document.getElementById('grafico-movimentacoes').getContext('2d');

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [], // Datas
      datasets: [
        {
          label: 'Entradas',
          backgroundColor: 'rgba(40, 167, 69, 0.7)', // Verde
          data: [],
        },
        {
          label: 'Saídas',
          backgroundColor: 'rgba(220, 53, 69, 0.7)', // Vermelho
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Data',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Valor (R$)',
          },
          beginAtZero: true,
        },
      },
    },
  });

  atualizarGrafico();
}

// --- Atualiza dados do gráfico ---
function atualizarGrafico(filtradas = null) {
  const lista = filtradas || movimentacoes;

  // Agrupar por data, somando entradas e saídas
  const mapData = {};

  for (const mov of lista) {
    if (!mapData[mov.data]) {
      mapData[mov.data] = { entrada: 0, saida: 0 };
    }
    if (mov.tipo === 'entrada') {
      mapData[mov.data].entrada += mov.valor;
    } else {
      mapData[mov.data].saida += mov.valor;
    }
  }

  // Ordenar as datas
  const datasOrdenadas = Object.keys(mapData).sort();

  // Preparar arrays para o gráfico
  const entradas = datasOrdenadas.map(data => mapData[data].entrada);
  const saidas = datasOrdenadas.map(data => mapData[data].saida);

  // Atualizar o gráfico
  chart.data.labels = datasOrdenadas.map(d => formatarData(d));
  chart.data.datasets[0].data = entradas;
  chart.data.datasets[1].data = saidas;

  chart.update();
}
