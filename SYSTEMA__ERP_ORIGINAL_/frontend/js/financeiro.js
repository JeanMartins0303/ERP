// Enviar lançamento e atualizar saldo
fetch("/financeiro/saldo").then(r => r.text()).then(s => {
  document.getElementById("saldo").innerText = "Saldo atual: R$ " + s;
});

// Função para carregar dados
function carregarFinanceiro() {
  fetch("http://localhost:8080/financeiro")
    .then(resp => resp.json())
    .then(lista => {
      const tabela = document.getElementById("tabela-financeiro");
      tabela.innerHTML = "";
      lista.forEach(f => {
        tabela.innerHTML += `
          <tr>
            <td>${f.descricao}</td>
            <td>R$ ${f.valor.toFixed(2)}</td>
            <td>${f.tipo}</td>
            <td>${f.data}</td>
            <td><button onclick="excluir(${f.id})">Excluir</button></td>
          </tr>`;
      });
    });
}

// Cadastrar novo lançamento
document.getElementById("form-financeiro").addEventListener("submit", e => {
  e.preventDefault();

  const novo = {
    descricao: document.getElementById("descricao").value,
    valor: parseFloat(document.getElementById("valor").value),
    tipo: document.getElementById("tipo").value,
    data: document.getElementById("data").value
  };

  fetch("http://localhost:8080/financeiro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novo)
  }).then(() => {
    document.getElementById("form-financeiro").reset();
    carregarFinanceiro();
  });
});

// Excluir lançamento
function excluir(id) {
  if (confirm("Deseja excluir este lançamento?")) {
    fetch(`http://localhost:8080/financeiro/${id}`, {
      method: "DELETE"
    }).then(() => carregarFinanceiro());
  }
}

// Inicializa
carregarFinanceiro();



let graficoBarras;
let graficoPizza;

// Função para gerar gráficos
function gerarGraficos(dados) {
  const meses = {};
  let totalEntrada = 0;
  let totalSaida = 0;

  dados.forEach(l => {
    const mes = l.data.substring(0, 7); // yyyy-mm
    if (!meses[mes]) {
      meses[mes] = { Entrada: 0, Saída: 0 };
    }
    meses[mes][l.tipo] += l.valor;

    if (l.tipo === "Entrada") totalEntrada += l.valor;
    else totalSaida += l.valor;
  });

  const labels = Object.keys(meses);
  const entradas = labels.map(m => meses[m].Entrada);
  const saidas = labels.map(m => meses[m].Saída);

  // Remove gráficos antigos se existirem
  if (graficoBarras) graficoBarras.destroy();
  if (graficoPizza) graficoPizza.destroy();

  // Gráfico de Barras
  const ctx1 = document.getElementById('grafico-barras').getContext('2d');
  graficoBarras = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Entradas',
          backgroundColor: '#28a745',
          data: entradas
        },
        {
          label: 'Saídas',
          backgroundColor: '#dc3545',
          data: saidas
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Entradas x Saídas por Mês'
        }
      }
    }
  });

  // Gráfico de Pizza
  const ctx2 = document.getElementById('grafico-pizza').getContext('2d');
  graficoPizza = new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: ['Entradas', 'Saídas'],
      datasets: [{
        data: [totalEntrada, totalSaida],
        backgroundColor: ['#28a745', '#dc3545']
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Distribuição Geral de Entradas e Saídas'
        }
      }
    }
  });
}


function carregarFinanceiro() {
  fetch("http://localhost:8080/financeiro")
    .then(resp => resp.json())
    .then(lista => {
      const tabela = document.getElementById("tabela-financeiro");
      tabela.innerHTML = "";
      lista.forEach(f => {
        tabela.innerHTML += `
          <tr>
            <td>${f.descricao}</td>
            <td>R$ ${f.valor.toFixed(2)}</td>
            <td>${f.tipo}</td>
            <td>${f.data}</td>
            <td><button onclick="excluir(${f.id})">Excluir</button></td>
          </tr>`;
      });

      // Gera os gráficos com os dados recebidos
      gerarGraficos(lista);
    });
}


const ctx = document.getElementById('graficoFinanceiro').getContext('2d');
    const grafico = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        datasets: [
          {
            label: 'Entradas',
            data: [4000, 3500, 3800, 4200, 3900],
            backgroundColor: 'rgba(46, 204, 113, 0.7)',
            borderRadius: 6
          },
          {
            label: 'Saídas',
            data: [1200, 900, 1300, 1100, 1050],
            backgroundColor: 'rgba(231, 76, 60, 0.7)',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Fluxo de Caixa'
          }
        }
      }
    });

    document.getElementById('form-movimentacao').addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Movimentação adicionada (simulação).');
    });

    function filtrarPorData() {
      const inicio = document.getElementById('data-inicio').value;
      const fim = document.getElementById('data-fim').value;
      alert(`Filtrando de ${inicio} até ${fim} (simulação).`);
    }