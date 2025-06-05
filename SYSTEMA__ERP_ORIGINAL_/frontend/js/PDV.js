// Dados de exemplo (substituir por dados reais da API)
const produtos = [
  { id: 1, nome: 'Café Expresso', preco: 5.00, categoria: 'bebidas', estoque: 100 },
  { id: 2, nome: 'X-Burger', preco: 15.00, categoria: 'pratos', estoque: 50 },
  { id: 3, nome: 'Batata Frita', preco: 12.00, categoria: 'pratos', estoque: 75 },
  { id: 4, nome: 'Refrigerante', preco: 6.00, categoria: 'bebidas', estoque: 200 },
  { id: 5, nome: 'Água Mineral', preco: 3.00, categoria: 'bebidas', estoque: 150 },
  { id: 6, nome: 'Salada', preco: 18.00, categoria: 'pratos', estoque: 30 },
  { id: 7, nome: 'Sobremesa', preco: 8.00, categoria: 'pratos', estoque: 40 },
  { id: 8, nome: 'Suco Natural', preco: 7.00, categoria: 'bebidas', estoque: 60 }
];

// Estado do carrinho
let carrinho = [];
let desconto = 0;

// Elementos DOM
const produtosGrid = document.getElementById('produtosGrid');
const carrinhoItems = document.getElementById('carrinhoItems');
const subtotalEl = document.getElementById('subtotal');
const descontoEl = document.getElementById('desconto');
const totalEl = document.getElementById('total');
const buscaInput = document.getElementById('buscaProduto');
const categoriaBtns = document.querySelectorAll('.categoria-btn');
const btnLimparCarrinho = document.getElementById('btnLimparCarrinho');
const btnDesconto = document.getElementById('btnDesconto');
const btnFinalizar = document.getElementById('btnFinalizar');
const modalPagamento = document.getElementById('modalPagamento');
const modalDesconto = document.getElementById('modalDesconto');
const formPagamento = document.getElementById('formPagamento');
const formDesconto = document.getElementById('formDesconto');
const valorTotalInput = document.getElementById('valorTotal');
const formaPagamentoSelect = document.getElementById('formaPagamento');
const valorPagoInput = document.getElementById('valorPago');
const trocoInput = document.getElementById('troco');
const grupoTroco = document.getElementById('grupoTroco');
const grupoTrocoValor = document.getElementById('grupoTrocoValor');

// Funções auxiliares
function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

function calcularTotais() {
  const subtotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  const total = subtotal - desconto;

  subtotalEl.textContent = formatarMoeda(subtotal);
  descontoEl.textContent = formatarMoeda(desconto);
  totalEl.textContent = formatarMoeda(total);

  return { subtotal, total };
}

// Renderização de produtos
function renderizarProdutos(produtosFiltrados = produtos) {
  produtosGrid.innerHTML = produtosFiltrados.map(produto => `
    <div class="produto-card" data-id="${produto.id}">
      <h3>${produto.nome}</h3>
      <div class="preco">${formatarMoeda(produto.preco)}</div>
      <div class="categoria">${produto.categoria}</div>
    </div>
  `).join('');

  // Adicionar eventos aos cards
  document.querySelectorAll('.produto-card').forEach(card => {
    card.addEventListener('click', () => adicionarAoCarrinho(parseInt(card.dataset.id)));
  });
}

// Gerenciamento do carrinho
function adicionarAoCarrinho(produtoId) {
  const produto = produtos.find(p => p.id === produtoId);
  if (!produto) return;

  const itemExistente = carrinho.find(item => item.id === produtoId);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1
    });
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  carrinhoItems.innerHTML = carrinho.map(item => `
    <div class="carrinho-item">
      <div class="info">
        <span class="nome">${item.nome}</span>
        <span class="preco">${formatarMoeda(item.preco)}</span>
      </div>
      <div class="quantidade">
        <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
        <span>${item.quantidade}</span>
        <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
      </div>
      <div class="subtotal">${formatarMoeda(item.preco * item.quantidade)}</div>
      <button class="remover" onclick="removerItem(${item.id})">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');

  calcularTotais();
}

function alterarQuantidade(produtoId, delta) {
  const item = carrinho.find(item => item.id === produtoId);
  if (!item) return;

  item.quantidade = Math.max(1, item.quantidade + delta);
  atualizarCarrinho();
}

function removerItem(produtoId) {
  carrinho = carrinho.filter(item => item.id !== produtoId);
  atualizarCarrinho();
}

// Filtros e busca
function filtrarProdutos() {
  const termoBusca = buscaInput.value.toLowerCase();
  const categoriaAtiva = document.querySelector('.categoria-btn.active').dataset.categoria;

  const produtosFiltrados = produtos.filter(produto => {
    const matchBusca = produto.nome.toLowerCase().includes(termoBusca);
    const matchCategoria = categoriaAtiva === 'todos' || produto.categoria === categoriaAtiva;
    return matchBusca && matchCategoria;
  });

  renderizarProdutos(produtosFiltrados);
}

// Eventos
buscaInput.addEventListener('input', filtrarProdutos);

categoriaBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoriaBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filtrarProdutos();
  });
});

btnLimparCarrinho.addEventListener('click', () => {
  carrinho = [];
  desconto = 0;
  atualizarCarrinho();
});

// Modais
function mostrarModal(modal) {
  modal.classList.remove('hidden');
}

function esconderModal(modal) {
  modal.classList.add('hidden');
}

// Desconto
btnDesconto.addEventListener('click', () => {
  mostrarModal(modalDesconto);
});

formDesconto.addEventListener('submit', (e) => {
  e.preventDefault();
  const tipo = document.getElementById('tipoDesconto').value;
  const valor = parseFloat(document.getElementById('valorDesconto').value);

  if (tipo === 'percentual') {
    const { subtotal } = calcularTotais();
    desconto = (subtotal * valor) / 100;
  } else {
    desconto = valor;
  }

  atualizarCarrinho();
  esconderModal(modalDesconto);
  formDesconto.reset();
});

// Pagamento
btnFinalizar.addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Adicione itens ao carrinho antes de finalizar a venda.');
    return;
  }

  const { total } = calcularTotais();
  valorTotalInput.value = formatarMoeda(total);
  mostrarModal(modalPagamento);
});

formaPagamentoSelect.addEventListener('change', () => {
  const isDinheiro = formaPagamentoSelect.value === 'dinheiro';
  grupoTroco.classList.toggle('hidden', !isDinheiro);
  grupoTrocoValor.classList.toggle('hidden', !isDinheiro);
});

valorPagoInput.addEventListener('input', () => {
  const valorPago = parseFloat(valorPagoInput.value) || 0;
  const total = parseFloat(valorTotalInput.value.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
  const troco = Math.max(0, valorPago - total);
  trocoInput.value = formatarMoeda(troco);
});

formPagamento.addEventListener('submit', (e) => {
  e.preventDefault();
  // Aqui você implementaria a lógica de finalização da venda
  alert('Venda finalizada com sucesso!');
  carrinho = [];
  desconto = 0;
  atualizarCarrinho();
  esconderModal(modalPagamento);
  formPagamento.reset();
});

// Fechar modais
document.querySelectorAll('.btnFecharModal, .btnCancelar, .btnCancelarDesconto').forEach(btn => {
  btn.addEventListener('click', () => {
    esconderModal(modalPagamento);
    esconderModal(modalDesconto);
  });
});

// Inicialização
renderizarProdutos();
atualizarCarrinho();

// Tema
document.getElementById('btnToggleTema').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = document.querySelector('#btnToggleTema i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Menu mobile
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('open');
});
