// --- Estado global ---
let transacoes = [];
let idEdicao = null;

const categorias = {
  receita: ['Vendas', 'Serviços', 'Investimentos', 'Outros'],
  despesa: ['Aluguel', 'Funcionários', 'Fornecedores', 'Impostos', 'Manutenção', 'Outros']
};

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
  configurarTema();
  carregarTransacoes();
  configurarEventos();
  atualizarCategorias();
  inicializarGraficos();
});

// --- Tema ---
function configurarTema() {
  const temaSalvo = localStorage.getItem('tema') || 'light';
  document.body.className = temaSalvo;
  atualizarIconeTema(temaSalvo);

  document.getElementById('btnToggleTema').onclick = () => {
    const temaAtual = document.body.classList.contains('light') ? 'dark' : 'light';
    document.body.className = temaAtual;
    localStorage.setItem('tema', temaAtual);
    atualizarIconeTema(temaAtual);
  };
}

function atualizarIconeTema(tema) {
  const btn = document.getElementById('btnToggleTema');
  btn.innerHTML = tema === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// --- Eventos ---
function configurarEventos() {
  document.getElementById('searchFinance').addEventListener('input', filtrarTransacoes);
  document.getElementById('filtroTipo').addEventListener('change', filtrarTransacoes);
  document.getElementById('filtroCategoria').addEventListener('change', filtrarTransacoes);
  document.getElementById('tipoTransacao').addEventListener('change', atualizarCategorias);
  document.getElementById('formNovaTransacao').addEventListener('submit', criarOuEditarTransacao);
}

// --- Dados Simulados ---
function carregarTransacoes() {
  transacoes = [
    { id: 1, data: '2024-06-01', descricao: 'Venda de produtos', categoria: 'Vendas', tipo: 'receita', valor: 1500, status: 'pago', formaPagamento: 'cartao_credito' },
    { id: 2, data: '2024-06-02', descricao: 'Pagamento aluguel', categoria: 'Aluguel', tipo: 'despesa', valor: 800, status: 'pendente', formaPagamento: 'boleto' }
  ];
  atualizarTabelaTransacoes();
  atualizarResumo();
}

// --- Tabela e Filtros ---
function atualizarTabelaTransacoes(filtradas = null) {
  const tbody = document.getElementById('transacoesTableBody');
  tbody.innerHTML = '';
  const lista = filtradas || transacoes;
  lista.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${formatarData(t.data)}</td>
      <td>${t.descricao}</td>
      <td>${t.categoria}</td>
      <td>${t.tipo === 'receita' ? 'Receita' : 'Despesa'}</td>
      <td class="${t.tipo === 'receita' ? 'valor-positivo' : 'valor-negativo'}">${formatarValor(t.valor)}</td>
      <td><span class="status ${t.status}">${formatarStatus(t.status)}</span></td>
      <td class="acoes">
        <button class="btn-icon" onclick="editarTransacao(${t.id})" title="Editar"><i class="fas fa-edit"></i></button>
        <button class="btn-icon" onclick="excluirTransacao(${t.id})" title="Excluir"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filtrarTransacoes() {
  const tipo = document.getElementById('filtroTipo').value;
  const categoria = document.getElementById('filtroCategoria').value;
  const busca = document.getElementById('searchFinance').value.toLowerCase();
  let filtradas = transacoes;
  if (tipo !== 'todos') filtradas = filtradas.filter(t => t.tipo === tipo);
  if (categoria !== 'todas') filtradas = filtradas.filter(t => t.categoria.toLowerCase() === categoria);
  if (busca) filtradas = filtradas.filter(t => t.descricao.toLowerCase().includes(busca) || t.categoria.toLowerCase().includes(busca));
  atualizarTabelaTransacoes(filtradas);
}

// --- Modal ---
function abrirModalNovaTransacao() {
  idEdicao = null;
  document.getElementById('formNovaTransacao').reset();
  atualizarCategorias();
  document.getElementById('modalNovaTransacao').classList.add('active');
}
window.abrirModalNovaTransacao = abrirModalNovaTransacao;

function fecharModalNovaTransacao() {
  document.getElementById('modalNovaTransacao').classList.remove('active');
  idEdicao = null;
}
window.fecharModalNovaTransacao = fecharModalNovaTransacao;

function atualizarCategorias() {
  const tipo = document.getElementById('tipoTransacao').value;
  const select = document.getElementById('categoriaTransacao');
  select.innerHTML = '';
  categorias[tipo].forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.toLowerCase();
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

// --- CRUD Transações ---
function criarOuEditarTransacao(e) {
  e.preventDefault();
  const nova = {
    id: idEdicao || (transacoes.length ? Math.max(...transacoes.map(t => t.id)) + 1 : 1),
    data: document.getElementById('dataTransacao').value,
    descricao: document.getElementById('descricaoTransacao').value,
    categoria: document.getElementById('categoriaTransacao').selectedOptions[0].textContent,
    tipo: document.getElementById('tipoTransacao').value,
    valor: parseFloat(document.getElementById('valorTransacao').value),
    status: 'pendente',
    formaPagamento: document.getElementById('formaPagamento').value
  };
  if (idEdicao) {
    const idx = transacoes.findIndex(t => t.id === idEdicao);
    transacoes[idx] = nova;
    } else {
    transacoes.push(nova);
    }
  atualizarTabelaTransacoes();
  atualizarResumo();
  fecharModalNovaTransacao();
  }

window.editarTransacao = function(id) {
  const t = transacoes.find(t => t.id === id);
  if (!t) return;
  idEdicao = id;
  document.getElementById('tipoTransacao').value = t.tipo;
  atualizarCategorias();
  document.getElementById('categoriaTransacao').value = t.categoria.toLowerCase();
  document.getElementById('descricaoTransacao').value = t.descricao;
  document.getElementById('valorTransacao').value = t.valor;
  document.getElementById('dataTransacao').value = t.data;
  document.getElementById('formaPagamento').value = t.formaPagamento;
  document.getElementById('modalNovaTransacao').classList.add('active');
};

window.excluirTransacao = function(id) {
  if (confirm('Deseja realmente excluir esta transação?')) {
    transacoes = transacoes.filter(t => t.id !== id);
    atualizarTabelaTransacoes();
    atualizarResumo();
    }
};

// --- Resumo ---
function atualizarResumo() {
  const saldo = transacoes.reduce((acc, t) => acc + (t.tipo === 'receita' ? t.valor : -t.valor), 0);
  const receitas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
  const despesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
  const resultado = receitas - despesas;
  document.getElementById('saldoAtual').textContent = formatarValor(saldo);
  document.getElementById('receitasMes').textContent = formatarValor(receitas);
  document.getElementById('despesasMes').textContent = formatarValor(despesas);
  const resultadoEl = document.getElementById('resultadoMes');
  resultadoEl.textContent = formatarValor(resultado);
  resultadoEl.className = resultado >= 0 ? 'valor-positivo' : 'valor-negativo';
}

// --- Gráficos ---
let graficoFluxoCaixa = null;
let graficoDespesas = null;
function inicializarGraficos() {
  const ctxFluxo = document.getElementById('graficoFluxoCaixa').getContext('2d');
  const ctxDesp = document.getElementById('graficoDespesas').getContext('2d');
  graficoFluxoCaixa = new Chart(ctxFluxo, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [
        { label: 'Receitas', data: [12000, 19000, 15000, 17000, 22000, 20000], borderColor: '#4CAF50', tension: 0.4 },
        { label: 'Despesas', data: [10000, 15000, 13000, 14000, 18000, 16000], borderColor: '#F44336', tension: 0.4 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }
  });
  graficoDespesas = new Chart(ctxDesp, {
    type: 'doughnut',
    data: {
      labels: ['Aluguel', 'Funcionários', 'Fornecedores', 'Impostos', 'Outros'],
      datasets: [{ data: [30, 25, 20, 15, 10], backgroundColor: ['#FFC107', '#2196F3', '#9C27B0', '#F44336', '#607D8B'] }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
  });
}

// --- Utilitários ---
function formatarData(data) {
  if (!data) return '';
  return new Date(data).toLocaleDateString('pt-BR');
}
function formatarValor(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function formatarStatus(status) {
  const map = { pago: 'Pago', pendente: 'Pendente', atrasado: 'Atrasado', cancelado: 'Cancelado' };
  return map[status] || status;
}

// --- Exportação e Impressão ---
window.exportarTransacoes = function() {
  const dados = JSON.stringify(transacoes, null, 2);
  const blob = new Blob([dados], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transacoes.json';
  a.click();
  URL.revokeObjectURL(url);
};
window.imprimirRelatorio = function() {
  window.print();
};
