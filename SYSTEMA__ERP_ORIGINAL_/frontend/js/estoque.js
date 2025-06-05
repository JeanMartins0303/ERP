// Configuração do tema
document.addEventListener('DOMContentLoaded', () => {
  const btnToggleTema = document.getElementById('btnToggleTema');
  const body = document.body;
  
  // Verifica tema salvo
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'dark') {
    body.classList.remove('light');
    body.classList.add('dark');
    btnToggleTema.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Alterna tema
  btnToggleTema.addEventListener('click', () => {
    body.classList.toggle('dark');
    body.classList.toggle('light');
    
    const isDark = body.classList.contains('dark');
    localStorage.setItem('tema', isDark ? 'dark' : 'light');
    btnToggleTema.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // Inicializa gráficos
  inicializarGraficos();
  carregarDadosEstoque();
  inicializarBusca();
});

// Função para inicializar os gráficos
function inicializarGraficos() {
  // Gráfico de Estoque por Categoria
  const ctxCategoria = document.getElementById('graficoEstoqueCategoria').getContext('2d');
  new Chart(ctxCategoria, {
    type: 'doughnut',
    data: {
      labels: ['Bebidas', 'Alimentos', 'Limpeza', 'Outros'],
      datasets: [{
        data: [30, 40, 20, 10],
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FFC107',
          '#9C27B0'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            font: {
              size: 12
            }
          }
        }
      },
      cutout: '70%'
    }
  });

  // Gráfico de Movimentação
  const ctxMovimentacao = document.getElementById('graficoMovimentacao').getContext('2d');
  new Chart(ctxMovimentacao, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        label: 'Entradas',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true
      }, {
        label: 'Saídas',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            font: {
              size: 12
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// Função para carregar dados do estoque
function carregarDadosEstoque() {
  // Simulação de dados - Substituir por chamada à API
  const dadosEstoque = [
    {
      codigo: '001',
      produto: 'Coca-Cola 2L',
      categoria: 'Bebidas',
      quantidade: 50,
      minimo: 10,
      ultimaAtualizacao: '2024-03-15'
    },
    {
      codigo: '002',
      produto: 'Arroz 5kg',
      categoria: 'Alimentos',
      quantidade: 30,
      minimo: 15,
      ultimaAtualizacao: '2024-03-14'
    },
    {
      codigo: '003',
      produto: 'Detergente',
      categoria: 'Limpeza',
      quantidade: 5,
      minimo: 20,
      ultimaAtualizacao: '2024-03-13'
    }
  ];

  atualizarTabelaEstoque(dadosEstoque);
  atualizarCards(dadosEstoque);
}

// Função para atualizar a tabela de estoque
function atualizarTabelaEstoque(dados) {
  const tbody = document.getElementById('corpoTabelaEstoque');
  tbody.innerHTML = '';

  dados.forEach(item => {
    const status = getStatusEstoque(item.quantidade, item.minimo);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.codigo}</td>
      <td>${item.produto}</td>
      <td>${item.categoria}</td>
      <td>${item.quantidade}</td>
      <td>${item.minimo}</td>
      <td><span class="status ${status.class}">${status.texto}</span></td>
      <td>${item.ultimaAtualizacao}</td>
      <td>
        <button onclick="editarProduto('${item.codigo}')" class="estoque-btn-icon" aria-label="Editar produto">
          <i class="fas fa-edit"></i>
        </button>
        <button onclick="excluirProduto('${item.codigo}')" class="estoque-btn-icon" aria-label="Excluir produto">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Função para determinar o status do estoque
function getStatusEstoque(quantidade, minimo) {
  if (quantidade === 0) {
    return { class: 'critico', texto: 'Sem Estoque' };
  } else if (quantidade <= minimo) {
    return { class: 'baixo', texto: 'Estoque Baixo' };
  } else {
    return { class: 'normal', texto: 'Normal' };
  }
}

// Função para atualizar os cards com informações resumidas
function atualizarCards(dados) {
  document.getElementById('totalProdutos').textContent = dados.length;
  
  const estoqueBaixo = dados.filter(item => item.quantidade <= item.minimo).length;
  document.getElementById('produtosBaixoEstoque').textContent = estoqueBaixo;
  
  const semEstoque = dados.filter(item => item.quantidade === 0).length;
  document.getElementById('produtosSemEstoque').textContent = semEstoque;
  
  // Simulação de valor total em estoque
  document.getElementById('valorTotalEstoque').textContent = 'R$ 15.000,00';
}

// Função para inicializar a busca
function inicializarBusca() {
  const searchInput = document.getElementById('searchProduto');
  searchInput.addEventListener('input', (e) => {
    const termoBusca = e.target.value.toLowerCase();
    const linhas = document.querySelectorAll('#corpoTabelaEstoque tr');
    
    linhas.forEach(linha => {
      const texto = linha.textContent.toLowerCase();
      linha.style.display = texto.includes(termoBusca) ? '' : 'none';
    });
  });
}

// Funções do Modal
function abrirModal() {
  const modal = document.getElementById('modalProduto');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  const modal = document.getElementById('modalProduto');
  modal.classList.remove('show');
  document.body.style.overflow = '';
  limparFormulario();
}

function limparFormulario() {
  document.getElementById('formProduto').reset();
}

// Função para salvar o produto
function salvarProduto(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const produto = {
    codigo: formData.get('codigo'),
    produto: formData.get('nome'),
    categoria: formData.get('categoria'),
    quantidade: parseInt(formData.get('quantidade')),
    minimo: parseInt(formData.get('minimo')),
    precoCusto: parseFloat(formData.get('precoCusto')),
    precoVenda: parseFloat(formData.get('precoVenda')),
    fornecedor: formData.get('fornecedor'),
    descricao: formData.get('descricao'),
    ultimaAtualizacao: new Date().toISOString().split('T')[0]
  };

  // Aqui você faria a chamada para a API
  console.log('Produto a ser salvo:', produto);
  
  // Simulação de sucesso
  alert('Produto cadastrado com sucesso!');
  fecharModal();
  
  // Atualiza a tabela (simulação)
  const dadosAtuais = JSON.parse(localStorage.getItem('produtos') || '[]');
  dadosAtuais.push(produto);
  localStorage.setItem('produtos', JSON.stringify(dadosAtuais));
  carregarDadosEstoque();
}

// Atualiza a função adicionarProduto para abrir o modal
function adicionarProduto() {
  abrirModal();
}

// Fecha o modal ao clicar fora dele
document.addEventListener('click', (event) => {
  const modal = document.getElementById('modalProduto');
  if (event.target === modal) {
    fecharModal();
  }
});

// Fecha o modal ao pressionar ESC
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    fecharModal();
  }
});

// Funções de ação
function editarProduto(codigo) {
  // Implementar edição do produto
  alert(`Editar produto ${codigo}`);
}

function excluirProduto(codigo) {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    // Implementar exclusão do produto
    alert(`Produto ${codigo} excluído`);
  }
}

function exportarRelatorio() {
  // Implementar exportação do relatório
  alert('Exportando relatório...');
}

function imprimirRelatorio() {
  // Implementar impressão do relatório
  window.print();
} 