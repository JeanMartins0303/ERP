// Dados simulados para exemplo
const dadosMovimentacoes = [
  { data: '2025-05-01', descricao: 'Venda Produto A', categoria: 'Vendas', tipo: 'Receita', valor: 1500 },
  { data: '2025-05-03', descricao: 'Compra matéria-prima', categoria: 'Compras', tipo: 'Despesa', valor: 500 },
  { data: '2025-05-07', descricao: 'Venda Produto B', categoria: 'Vendas', tipo: 'Receita', valor: 1200 },
  { data: '2025-05-10', descricao: 'Pagamento aluguel', categoria: 'Aluguel', tipo: 'Despesa', valor: 800 },
  { data: '2025-05-12', descricao: 'Serviço contratado', categoria: 'Serviços', tipo: 'Despesa', valor: 300 },
  { data: '2025-05-15', descricao: 'Venda Produto C', categoria: 'Vendas', tipo: 'Receita', valor: 900 },
  { data: '2025-05-20', descricao: 'Venda Produto D', categoria: 'Vendas', tipo: 'Receita', valor: 1100 },
  { data: '2025-05-22', descricao: 'Manutenção equipamentos', categoria: 'Manutenção', tipo: 'Despesa', valor: 400 },
];

// Referências DOM
const periodoSelect = document.getElementById('periodo');
const filtrosPersonalizados = document.getElementById('filtrosPersonalizados');
const dataInicioInput = document.getElementById('dataInicio');
const dataFimInput = document.getElementById('dataFim');
const btnFiltrar = document.getElementById('btnFiltrar');
const btnExportarPdf = document.getElementById('btnExportarPdf');
const corpoTabela = document.getElementById('corpoTabela');

// Gráficos
let graficoBarra;
let graficoPizza;

// Mostrar/ocultar filtros personalizados
periodoSelect.addEventListener('change', () => {
  filtrosPersonalizados.classList.toggle('hidden', periodoSelect.value !== 'personalizado');
});

// Função para filtrar dados baseado no período selecionado
function filtrarDados() {
  let dadosFiltrados = [...dadosMovimentacoes];
  const hoje = new Date();
  const periodo = periodoSelect.value;

  if (periodo === 'mes') {
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();
    dadosFiltrados = dadosFiltrados.filter(dado => {
      const data = new Date(dado.data);
      return data.getMonth() === mes && data.getFullYear() === ano;
    });
  } else if (periodo === 'ano') {
    const ano = hoje.getFullYear();
    dadosFiltrados = dadosFiltrados.filter(dado => new Date(dado.data).getFullYear() === ano);
  } else if (periodo === 'personalizado') {
    const inicio = new Date(dataInicioInput.value);
    const fim = new Date(dataFimInput.value);
    dadosFiltrados = dadosFiltrados.filter(dado => {
      const data = new Date(dado.data);
      return data >= inicio && data <= fim;
    });
  }

  atualizarTabela(dadosFiltrados);
  atualizarGraficos(dadosFiltrados);
}

// Atualiza a tabela de detalhamento
function atualizarTabela(dados) {
  corpoTabela.innerHTML = "";
  dados.forEach(dado => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${dado.data}</td>
      <td>${dado.descricao}</td>
      <td>${dado.categoria}</td>
      <td>${dado.tipo}</td>
      <td>R$ ${dado.valor.toFixed(2)}</td>
    `;
    corpoTabela.appendChild(linha);
  });
}

// Atualiza os gráficos
function atualizarGraficos(dados) {
  const receitas = dados.filter(d => d.tipo === 'Receita').reduce((sum, d) => sum + d.valor, 0);
  const despesas = dados.filter(d => d.tipo === 'Despesa').reduce((sum, d) => sum + d.valor, 0);

  const categorias = {};
  dados.forEach(d => {
    if (!categorias[d.categoria]) categorias[d.categoria] = 0;
    categorias[d.categoria] += d.valor;
  });

  const labelsCat = Object.keys(categorias);
  const valoresCat = Object.values(categorias);

  // Gráfico de Barra
  if (graficoBarra) graficoBarra.destroy();
  const ctxBarra = document.getElementById('graficoBarra').getContext('2d');
  graficoBarra = new Chart(ctxBarra, {
    type: 'bar',
    data: {
      labels: ['Receitas', 'Despesas'],
      datasets: [{
        label: 'Valores',
        data: [receitas, despesas],
        backgroundColor: ['#4caf50', '#f44336']
      }]
    }
  });

  // Gráfico de Pizza
  if (graficoPizza) graficoPizza.destroy();
  const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
  graficoPizza = new Chart(ctxPizza, {
    type: 'pie',
    data: {
      labels: labelsCat,
      datasets: [{
        label: 'Categorias',
        data: valoresCat,
        backgroundColor: ['#42a5f5', '#66bb6a', '#ffca28', '#ef5350', '#ab47bc', '#ffa726']
      }]
    }
  });
}

// Exportar para PDF
btnExportarPdf.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Relatório Financeiro", 14, 20);

  let y = 30;
  dadosMovimentacoes.forEach(dado => {
    doc.text(`${dado.data} - ${dado.descricao} - ${dado.tipo} - R$ ${dado.valor.toFixed(2)}`, 14, y);
    y += 8;
  });

  doc.save("relatorio-financeiro.pdf");
});

// Ao carregar, aplica filtro padrão
btnFiltrar.addEventListener('click', filtrarDados);
window.addEventListener('DOMContentLoaded', filtrarDados);
