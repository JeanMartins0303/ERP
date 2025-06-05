// Estado global
let relatorios = [];
let idEdicao = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  configurarTema();
  carregarRelatorios();
  configurarEventos();
  inicializarGraficos();
});

// Tema
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

// Eventos
function configurarEventos() {
  document.getElementById('searchRelatorio').addEventListener('input', filtrarRelatorios);
  document.getElementById('filtroTipoRelatorio').addEventListener('change', filtrarRelatorios);
  document.getElementById('formNovoRelatorio').addEventListener('submit', gerarNovoRelatorio);
}

// Dados Simulados
function carregarRelatorios() {
  relatorios = [
    { id: 1, data: '2024-06-01', tipo: 'vendas', titulo: 'Vendas Maio', responsavel: 'João', status: 'sucesso' },
    { id: 2, data: '2024-06-02', tipo: 'despesas', titulo: 'Despesas Maio', responsavel: 'Maria', status: 'gerando' }
  ];
  atualizarTabelaRelatorios();
}

// Tabela e Filtros
function atualizarTabelaRelatorios(filtradas = null) {
  const tbody = document.getElementById('relatoriosTableBody');
  tbody.innerHTML = '';
  const lista = filtradas || relatorios;
  lista.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${formatarData(r.data)}</td>
      <td>${formatarTipo(r.tipo)}</td>
      <td>${r.titulo}</td>
      <td>${r.responsavel}</td>
      <td><span class="status ${r.status}">${formatarStatus(r.status)}</span></td>
      <td class="acoes">
        <button class="btn-icon" onclick="excluirRelatorio(${r.id})" title="Excluir"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filtrarRelatorios() {
  const tipo = document.getElementById('filtroTipoRelatorio').value;
  const busca = document.getElementById('searchRelatorio').value.toLowerCase();
  let filtradas = relatorios;
  if (tipo !== 'todos') filtradas = filtradas.filter(r => r.tipo === tipo);
  if (busca) filtradas = filtradas.filter(r => r.titulo.toLowerCase().includes(busca));
  atualizarTabelaRelatorios(filtradas);
}

// Modal
function abrirModalNovoRelatorio() {
  idEdicao = null;
  document.getElementById('formNovoRelatorio').reset();
  document.getElementById('modalNovoRelatorio').classList.add('active');
}
window.abrirModalNovoRelatorio = abrirModalNovoRelatorio;

function fecharModalNovoRelatorio() {
  document.getElementById('modalNovoRelatorio').classList.remove('active');
  idEdicao = null;
}
window.fecharModalNovoRelatorio = fecharModalNovoRelatorio;

// CRUD Relatórios
function gerarNovoRelatorio(e) {
  e.preventDefault();
  const novo = {
    id: relatorios.length ? Math.max(...relatorios.map(r => r.id)) + 1 : 1,
    data: document.getElementById('periodoRelatorio').value + '-01',
    tipo: document.getElementById('tipoRelatorio').value,
    titulo: document.getElementById('tituloRelatorio').value,
    responsavel: 'Usuário',
    status: 'gerando'
  };
  relatorios.push(novo);
  atualizarTabelaRelatorios();
  fecharModalNovoRelatorio();
}

window.excluirRelatorio = function(id) {
  if (confirm('Deseja realmente excluir este relatório?')) {
    relatorios = relatorios.filter(r => r.id !== id);
    atualizarTabelaRelatorios();
  }
};

// Gráficos
let graficoVendas = null;
let graficoDespesas = null;
let graficoEstoque = null;
let graficoClientes = null;
function inicializarGraficos() {
  graficoVendas = new Chart(document.getElementById('graficoVendas').getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{ label: 'Vendas', data: [120, 190, 150, 170, 220, 200], backgroundColor: 'rgba(79,70,229,0.7)' }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
  graficoDespesas = new Chart(document.getElementById('graficoDespesas').getContext('2d'), {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{ label: 'Despesas', data: [100, 150, 130, 140, 180, 160], borderColor: '#F44336', tension: 0.4 }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
  graficoEstoque = new Chart(document.getElementById('graficoEstoque').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Baixo', 'Normal', 'Alto'],
      datasets: [{ data: [10, 60, 30], backgroundColor: ['#F59E0B', '#10B981', '#3B82F6'] }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
  graficoClientes = new Chart(document.getElementById('graficoClientes').getContext('2d'), {
    type: 'pie',
    data: {
      labels: ['Ativos', 'Inativos'],
      datasets: [{ data: [80, 20], backgroundColor: ['#4F46E5', '#E5E7EB'] }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

// Utilitários
function formatarData(data) {
  if (!data) return '';
  return new Date(data).toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' });
}
function formatarTipo(tipo) {
  const map = { vendas: 'Vendas', despesas: 'Despesas', estoque: 'Estoque', clientes: 'Clientes' };
  return map[tipo] || tipo;
}
function formatarStatus(status) {
  const map = { sucesso: 'Sucesso', gerando: 'Gerando', falha: 'Falha', cancelado: 'Cancelado' };
  return map[status] || status;
}

// Exportação e Impressão
window.exportarRelatorios = function() {
  const dados = JSON.stringify(relatorios, null, 2);
  const blob = new Blob([dados], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'relatorios.json';
  a.click();
  URL.revokeObjectURL(url);
};
window.imprimirRelatorio = function() {
  window.print();
}; 