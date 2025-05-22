// DOM Elements
const periodoSelect = document.getElementById('periodo');
const filtrosPersonalizados = document.getElementById('filtrosPersonalizados');
const dataInicioInput = document.getElementById('dataInicio');
const dataFimInput = document.getElementById('dataFim');
const btnFiltrar = document.getElementById('btnFiltrar');
const btnExportarPdf = document.getElementById('btnExportarPdf');
const corpoTabela = document.getElementById('corpoTabela');

let graficoBarra = null;
let graficoPizza = null;

// Dados simulados (pode substituir pela origem real)
let movimentacoes = [
  { data: '2025-05-01', descricao: 'Venda Produto A', categoria: 'Vendas', tipo: 'Receita', valor: 1500 },
  { data: '2025-05-03', descricao: 'Compra Matéria Prima', categoria: 'Compras', tipo: 'Despesa', valor: 700 },
  { data: '2025-05-05', descricao: 'Serviço Prestado', categoria: 'Serviços', tipo: 'Receita', valor: 1200 },
  { data: '2025-05-08', descricao: 'Conta Luz', categoria: 'Despesas Fixas', tipo: 'Despesa', valor: 350 },
  { data: '2025-05-10', descricao: 'Venda Produto B', categoria: 'Vendas', tipo: 'Receita', valor: 900 },
  { data: '2025-05-15', descricao: 'Manutenção Equip.', categoria: 'Despesas Fixas', tipo: 'Despesa', valor: 500 },
  { data: '2025-05-18', descricao: 'Compra Marketing', categoria: 'Marketing', tipo: 'Despesa', valor: 300 },
];

// Utilitário para formatar valor monetário
function formatarValor(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Utilitário para formatar data (DD/MM/YYYY)
function formatarData(dataStr) {
  const data = new Date(dataStr);
  return data.toLocaleDateString('pt-BR');
}

// Filtra movimentações segundo o período
function filtrarMovimentacoes() {
  const periodo = periodoSelect.value;

  let dataInicio, dataFim;

  const hoje = new Date();

  if (periodo === 'mes') {
    dataInicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    dataFim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
  } else if (periodo === 'ano') {
    dataInicio = new Date(hoje.getFullYear(), 0, 1);
    dataFim = new Date(hoje.getFullYear(), 11, 31);
  } else if (periodo === 'personalizado') {
    if (!dataInicioInput.value || !dataFimInput.value) {
      alert('Por favor, selecione a data de início e fim.');
      return null;
    }
    dataInicio = new Date(dataInicioInput.value);
    dataFim = new Date(dataFimInput.value);
    if (dataFim < dataInicio) {
      alert('Data fim deve ser maior ou igual à data início.');
      return null;
    }
  }

  return movimentacoes.filter(mov => {
    const dataMov = new Date(mov.data);
    return dataMov >= dataInicio && dataMov <= dataFim;
  });
}

// Renderiza tabela com dados filtrados
function renderizarTabela(dados) {
  corpoTabela.innerHTML = '';
  if (dados.length === 0) {
    corpoTabela.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: #666;">Nenhum registro encontrado.</td></tr>`;
    return;
  }
  dados.forEach(({ data, descricao, categoria, tipo, valor }) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${formatarData(data)}</td>
      <td>${descricao}</td>
      <td>${categoria}</td>
      <td>${tipo}</td>
      <td>${formatarValor(valor)}</td>
    `;
    corpoTabela.appendChild(tr);
  });
}

// Cria/Atualiza gráfico de barras (Receitas vs Despesas)
function criarGraficoBarra(dados) {
  const ctx = document.getElementById('graficoBarra').getContext('2d');

  // Sumariza receitas e despesas por categoria
  const resumo = { Receitas: 0, Despesas: 0 };
  dados.forEach(({ tipo, valor }) => {
    if (tipo.toLowerCase() === 'receita') resumo.Receitas += valor;
    else resumo.Despesas += valor;
  });

  if (graficoBarra) graficoBarra.destroy();

  graficoBarra = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Receitas', 'Despesas'],
      datasets: [{
        label: 'Valor (R$)',
        data: [resumo.Receitas, resumo.Despesas],
        backgroundColor: ['#2a6599', '#db3c3c'],
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Cria/Atualiza gráfico de pizza (Distribuição por categoria)
function criarGraficoPizza(dados) {
  const ctx = document.getElementById('graficoPizza').getContext('2d');

  // Agrega valores por categoria
  const categorias = {};
  dados.forEach(({ categoria, valor }) => {
    categorias[categoria] = (categorias[categoria] || 0) + valor;
  });

  if (graficoPizza) graficoPizza.destroy();

  graficoPizza = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(categorias),
      datasets: [{
        data: Object.values(categorias),
        backgroundColor: [
          '#2a6599',
          '#dbad67',
          '#db3c3c',
          '#6c757d',
          '#17a2b8',
          '#ffc107',
          '#28a745'
        ],
        borderWidth: 1,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 18,
            padding: 10,
          }
        }
      }
    }
  });
}

// Atualiza a tela com os dados filtrados
function atualizarTela() {
  const dadosFiltrados = filtrarMovimentacoes();
  if (!dadosFiltrados) return;
  renderizarTabela(dadosFiltrados);
  criarGraficoBarra(dadosFiltrados);
  criarGraficoPizza(dadosFiltrados);
}

// Exporta relatório para PDF
async function exportarParaPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Relatório Financeiro', 14, 22);

  // Filtros info
  const periodo = periodoSelect.value;
  let filtroTexto = '';
  if (periodo === 'mes') filtroTexto = 'Mês Atual';
  else if (periodo === 'ano') filtroTexto = 'Ano Atual';
  else if (periodo === 'personalizado') {
    filtroTexto = `Personalizado: ${dataInicioInput.value} até ${dataFimInput.value}`;
  }
  doc.setFontSize(12);
  doc.text(`Período: ${filtroTexto}`, 14, 32);

  // Tabela
  let startY = 40;
  const colWidths = [30, 60, 40, 30, 30];
  const headers = ['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor'];

  doc.setFontSize(10);
  doc.setFillColor(42, 101, 153);
  doc.setTextColor(255, 255, 255);

  // Cabeçalho tabela
  let x = 14;
  headers.forEach((header, i) => {
    doc.rect(x, startY - 8, colWidths[i], 8, 'F');
    doc.text(header, x + 2, startY - 4);
    x += colWidths[i];
  });

  // Dados da tabela
  doc.setTextColor(0, 0, 0);
  const dados = filtrarMovimentacoes();
  if (!dados) return;

  let y = startY;
  dados.forEach(({ data, descricao, categoria, tipo, valor }) => {
    x = 14;
    const linha = [
      formatarData(data),
      descricao,
      categoria,
      tipo,
      formatarValor(valor)
    ];
    linha.forEach((texto, i) => {
      doc.text(texto, x + 2, y);
      x += colWidths[i];
    });
    y += 8;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save('relatorio_financeiro.pdf');
}

// Eventos
periodoSelect.addEventListener('change', () => {
  filtrosPersonalizados.classList.toggle('hidden', periodoSelect.value !== 'personalizado');
});

btnFiltrar.addEventListener('click', atualizarTela);
btnExportarPdf.addEventListener('click', exportarParaPdf);

// Inicialização
window.onload = () => {
  atualizarTela();
};
