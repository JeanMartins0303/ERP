// Dados fictícios para simulação
const dadosRelatorio = [
  { data: '2025-05-01', tipo: 'Entrada', valor: 1200 },
  { data: '2025-05-03', tipo: 'Saída', valor: 500 },
  { data: '2025-05-07', tipo: 'Entrada', valor: 800 },
  { data: '2025-05-10', tipo: 'Saída', valor: 300 },
  { data: '2025-05-14', tipo: 'Entrada', valor: 1500 },
];

// Elementos DOM
const tabelaBody = document.querySelector("#tabela-detalhes tbody");
const entradaSpan = document.getElementById("entrada-total");
const saidaSpan = document.getElementById("saida-total");
const saldoSpan = document.getElementById("saldo-total");

// Carregar dados na tabela
function carregarTabela(filtrados = dadosRelatorio) {
  tabelaBody.innerHTML = '';

  let totalEntrada = 0;
  let totalSaida = 0;

  filtrados.forEach(item => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${item.data}</td>
      <td>${item.tipo}</td>
      <td>R$ ${item.valor.toFixed(2)}</td>
    `;
    tabelaBody.appendChild(linha);

    if (item.tipo === 'Entrada') totalEntrada += item.valor;
    else totalSaida += item.valor;
  });

  entradaSpan.textContent = `R$ ${totalEntrada.toFixed(2)}`;
  saidaSpan.textContent = `R$ ${totalSaida.toFixed(2)}`;
  saldoSpan.textContent = `R$ ${(totalEntrada - totalSaida).toFixed(2)}`;
}

// Filtrar por data
document.getElementById("btn-filtrar").addEventListener("click", () => {
  const dataInicio = document.getElementById("data-inicio").value;
  const dataFim = document.getElementById("data-fim").value;

  const filtrados = dadosRelatorio.filter(item => {
    const data = new Date(item.data);
    return (!dataInicio || data >= new Date(dataInicio)) &&
           (!dataFim || data <= new Date(dataFim));
  });

  carregarTabela(filtrados);
});

// Gráfico de barras
const ctx = document.getElementById("grafico-relatorio").getContext("2d");
const grafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: dadosRelatorio.map(d => d.data),
    datasets: [
      {
        label: 'Entradas',
        data: dadosRelatorio.map(d => d.tipo === 'Entrada' ? d.valor : 0),
        backgroundColor: 'rgba(46, 204, 113, 0.7)',
        borderRadius: 6
      },
      {
        label: 'Saídas',
        data: dadosRelatorio.map(d => d.tipo === 'Saída' ? d.valor : 0),
        backgroundColor: 'rgba(231, 76, 60, 0.7)',
        borderRadius: 6
      }
    ]
  },
  options: {
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Movimentações por Data',
        font: { size: 16, weight: 'bold' }
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  carregarTabela();
});
