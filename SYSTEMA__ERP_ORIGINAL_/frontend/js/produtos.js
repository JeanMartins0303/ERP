// Dados de exemplo
const produtos = [
  {
    id: 1,
    codigo: 'P001',
    nome: 'X-Burger',
    tipo: 'prato',
    categoria: 'Lanches',
    estoque: 0,
    estoqueMinimo: 0,
    custo: 8.50,
    preco: 15.90,
    status: 'ativo',
    descricao: 'Hambúrguer artesanal com queijo, alface e tomate',
    ingredientes: [
      { id: 1, nome: 'Pão de Hambúrguer', quantidade: 1, unidade: 'un' },
      { id: 2, nome: 'Hambúrguer', quantidade: 1, unidade: 'un' },
      { id: 3, nome: 'Queijo', quantidade: 1, unidade: 'fatia' },
      { id: 4, nome: 'Alface', quantidade: 1, unidade: 'folha' },
      { id: 5, nome: 'Tomate', quantidade: 2, unidade: 'fatia' }
    ]
  },
  {
    id: 2,
    codigo: 'P002',
    nome: 'Coca-Cola 350ml',
    tipo: 'mercadoria',
    categoria: 'Bebidas',
    estoque: 48,
    estoqueMinimo: 12,
    custo: 2.50,
    preco: 5.90,
    status: 'ativo',
    descricao: 'Refrigerante Coca-Cola lata 350ml'
  },
  {
    id: 3,
    codigo: 'P003',
    nome: 'Batata Frita',
    tipo: 'prato',
    categoria: 'Acompanhamentos',
    estoque: 0,
    estoqueMinimo: 0,
    custo: 3.50,
    preco: 8.90,
    status: 'ativo',
    descricao: 'Porção de batata frita crocante',
    ingredientes: [
      { id: 6, nome: 'Batata', quantidade: 200, unidade: 'g' },
      { id: 7, nome: 'Óleo', quantidade: 50, unidade: 'ml' }
    ]
  }
];

// Estado da aplicação
let estado = {
  produtos: [...produtos],
  filtros: {
    tipo: 'todos',
    categoria: 'todas',
    busca: ''
  },
  produtoEditando: null
};

// Elementos DOM
const elementos = {
  totalProdutos: document.getElementById('totalProdutos'),
  produtosEstoque: document.getElementById('produtosEstoque'),
  estoqueBaixo: document.getElementById('estoqueBaixo'),
  valorEstoque: document.getElementById('valorEstoque'),
  tipoProduto: document.getElementById('tipoProduto'),
  categoriaProduto: document.getElementById('categoriaProduto'),
  buscaProduto: document.getElementById('buscaProduto'),
  corpoTabelaProdutos: document.getElementById('corpoTabelaProdutos'),
  modalProduto: document.getElementById('modalProduto'),
  formProduto: document.getElementById('formProduto'),
  btnFecharModal: document.getElementById('btnFecharModal'),
  btnCancelar: document.getElementById('btnCancelar'),
  ingredientesContainer: document.getElementById('ingredientesContainer'),
  listaIngredientes: document.getElementById('listaIngredientes'),
  btnAdicionarIngrediente: document.getElementById('btnAdicionarIngrediente'),
  modalTitle: document.getElementById('modalTitle')
};

// Funções auxiliares
const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

const formatarNumero = (valor) => {
  return new Intl.NumberFormat('pt-BR').format(valor);
};

// Atualizar estatísticas
const atualizarEstatisticas = () => {
  const total = estado.produtos.length;
  const emEstoque = estado.produtos.filter(p => p.estoque > 0).length;
  const baixo = estado.produtos.filter(p => p.estoque <= p.estoqueMinimo && p.estoque > 0).length;
  const valorTotal = estado.produtos.reduce((acc, p) => acc + (p.estoque * p.custo), 0);

  elementos.totalProdutos.textContent = formatarNumero(total);
  elementos.produtosEstoque.textContent = formatarNumero(emEstoque);
  elementos.estoqueBaixo.textContent = formatarNumero(baixo);
  elementos.valorEstoque.textContent = formatarMoeda(valorTotal);
};

// Renderizar produtos
const renderizarProdutos = () => {
  const produtosFiltrados = estado.produtos.filter(produto => {
    const matchTipo = estado.filtros.tipo === 'todos' || produto.tipo === estado.filtros.tipo;
    const matchCategoria = estado.filtros.categoria === 'todas' || produto.categoria === estado.filtros.categoria;
    const matchBusca = !estado.filtros.busca || 
      produto.nome.toLowerCase().includes(estado.filtros.busca.toLowerCase()) ||
      produto.codigo.toLowerCase().includes(estado.filtros.busca.toLowerCase());
    
    return matchTipo && matchCategoria && matchBusca;
  });

  elementos.corpoTabelaProdutos.innerHTML = produtosFiltrados.map(produto => `
    <tr>
      <td>${produto.codigo}</td>
        <td>${produto.nome}</td>
      <td>${produto.tipo.charAt(0).toUpperCase() + produto.tipo.slice(1)}</td>
        <td>${produto.categoria}</td>
      <td>${formatarNumero(produto.estoque)}</td>
      <td>${formatarMoeda(produto.preco)}</td>
      <td>
        <span class="status ${produto.estoque <= produto.estoqueMinimo ? 'baixo' : produto.status}">
          <i class="fas fa-${produto.estoque <= produto.estoqueMinimo ? 'exclamation-triangle' : 
            produto.status === 'ativo' ? 'check-circle' : 'times-circle'}"></i>
          ${produto.estoque <= produto.estoqueMinimo ? 'Estoque Baixo' : 
            produto.status === 'ativo' ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td>
        <div class="acoes-btns">
          <button onclick="editarProduto(${produto.id})" class="btn-editar" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="excluirProduto(${produto.id})" class="btn-excluir" title="Excluir">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        </td>
    </tr>
  `).join('');
};

// Gerenciar ingredientes
const renderizarIngredientes = () => {
  if (!estado.produtoEditando) return;

  elementos.listaIngredientes.innerHTML = estado.produtoEditando.ingredientes.map((ing, index) => `
    <div class="ingrediente-item">
      <select class="ingrediente-select" onchange="atualizarIngrediente(${index}, this.value)">
        ${produtos
          .filter(p => p.tipo === 'ingrediente')
          .map(p => `<option value="${p.id}" ${p.id === ing.id ? 'selected' : ''}>${p.nome}</option>`)
          .join('')}
      </select>
      <div class="quantidade">
        <input type="number" value="${ing.quantidade}" min="0" step="0.1" 
          onchange="atualizarQuantidade(${index}, this.value)">
        <span>${ing.unidade}</span>
      </div>
      <button class="remover" onclick="removerIngrediente(${index})">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');
};

// Event Listeners
document.getElementById('btnFiltrar').addEventListener('click', () => {
  estado.filtros = {
    tipo: elementos.tipoProduto.value,
    categoria: elementos.categoriaProduto.value,
    busca: elementos.buscaProduto.value
  };
  renderizarProdutos();
});

document.getElementById('btnAdicionar').addEventListener('click', () => {
  // Criar novo produto
  estado.produtoEditando = {
    id: Date.now(),
    codigo: gerarCodigoProduto(),
    nome: '',
    tipo: 'mercadoria',
    categoria: '',
    estoque: 0,
    estoqueMinimo: 0,
    custo: 0,
    preco: 0,
    status: 'ativo',
    descricao: '',
    ingredientes: []
  };

  // Abrir modal
  const modal = document.getElementById('modalProduto');
  modal.style.display = 'flex';
  modal.style.opacity = '1';
  modal.style.visibility = 'visible';

  // Preencher formulário
  document.getElementById('tipoProdutoForm').value = estado.produtoEditando.tipo;
  document.getElementById('categoriaProdutoForm').value = estado.produtoEditando.categoria;
  document.getElementById('codigoProduto').value = estado.produtoEditando.codigo;
  document.getElementById('nomeProduto').value = '';
  document.getElementById('descricaoProduto').value = '';
  document.getElementById('estoqueProduto').value = '0';
  document.getElementById('estoqueMinimo').value = '0';
  document.getElementById('custoProduto').value = '0';
  document.getElementById('precoProduto').value = '0';
  document.getElementById('margemProduto').value = '0';

  // Esconder seção de ingredientes
  document.getElementById('ingredientesContainer').classList.add('hidden');
});

// Função para fechar o modal
function fecharModal() {
  const modal = document.getElementById('modalProduto');
  modal.style.display = 'none';
  modal.style.opacity = '0';
  modal.style.visibility = 'hidden';
  estado.produtoEditando = null;
  document.getElementById('formProduto').reset();
}

// Event Listeners do Modal
document.getElementById('btnFecharModal').addEventListener('click', fecharModal);
document.getElementById('btnCancelar').addEventListener('click', fecharModal);

// Event Listener do formulário
document.getElementById('formProduto').addEventListener('submit', (e) => {
  e.preventDefault();
  salvarProduto();
});

// Event Listener para tipo de produto
document.getElementById('tipoProdutoForm').addEventListener('change', (e) => {
  const ingredientesContainer = document.getElementById('ingredientesContainer');
  if (e.target.value === 'prato') {
    ingredientesContainer.classList.remove('hidden');
  } else {
    ingredientesContainer.classList.add('hidden');
  }
});

// Funções de manipulação
const gerarCodigoProduto = () => {
  const ultimoProduto = estado.produtos[estado.produtos.length - 1];
  const ultimoCodigo = ultimoProduto ? parseInt(ultimoProduto.codigo.replace('P', '')) : 0;
  return `P${String(ultimoCodigo + 1).padStart(3, '0')}`;
};

const salvarProduto = () => {
  const formData = new FormData(elementos.formProduto);
  const dados = Object.fromEntries(formData.entries());
  
  const produto = {
    ...estado.produtoEditando,
    ...dados,
    estoque: Number(dados.estoque),
    estoqueMinimo: Number(dados.estoqueMinimo),
    custo: Number(dados.custo),
    preco: Number(dados.preco)
  };

  const index = estado.produtos.findIndex(p => p.id === produto.id);
  if (index >= 0) {
    estado.produtos[index] = produto;
    mostrarNotificacao('Produto atualizado com sucesso!', 'success');
    } else {
    estado.produtos.push(produto);
    mostrarNotificacao('Produto adicionado com sucesso!', 'success');
  }

  fecharModal();
  renderizarProdutos();
  atualizarEstatisticas();
};

const editarProduto = (id) => {
  estado.produtoEditando = { ...estado.produtos.find(p => p.id === id) };
  abrirModal();
};

const excluirProduto = (id) => {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    estado.produtos = estado.produtos.filter(p => p.id !== id);
    renderizarProdutos();
    atualizarEstatisticas();
    mostrarNotificacao('Produto excluído com sucesso!', 'success');
  }
};

const atualizarIngrediente = (index, id) => {
  estado.produtoEditando.ingredientes[index].id = Number(id);
  renderizarIngredientes();
};

const atualizarQuantidade = (index, quantidade) => {
  estado.produtoEditando.ingredientes[index].quantidade = Number(quantidade);
};

const removerIngrediente = (index) => {
  estado.produtoEditando.ingredientes.splice(index, 1);
  renderizarIngredientes();
};

const mostrarNotificacao = (mensagem, tipo) => {
  const notificacao = document.createElement('div');
  notificacao.className = `notificacao ${tipo}`;
  notificacao.innerHTML = `
    <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${mensagem}</span>
  `;
  
  document.body.appendChild(notificacao);
  
  setTimeout(() => {
    notificacao.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notificacao.classList.remove('show');
    setTimeout(() => {
      notificacao.remove();
    }, 300);
  }, 3000);
};

// Inicialização
const inicializar = () => {
  // Preencher categorias
  const categorias = [...new Set(produtos.map(p => p.categoria))];
  elementos.categoriaProduto.innerHTML = `
    <option value="todas">Todas</option>
    ${categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
  `;

  // Preencher categorias no formulário
  document.getElementById('categoriaProdutoForm').innerHTML = elementos.categoriaProduto.innerHTML;

  // Renderizar dados iniciais
  renderizarProdutos();
  atualizarEstatisticas();
};

// Iniciar aplicação
inicializar();

// Calcular margem automaticamente
document.getElementById('custoProduto').addEventListener('input', calcularMargem);
document.getElementById('precoProduto').addEventListener('input', calcularMargem);

function calcularMargem() {
  const custo = parseFloat(document.getElementById('custoProduto').value) || 0;
  const preco = parseFloat(document.getElementById('precoProduto').value) || 0;
  const margem = custo > 0 ? ((preco - custo) / custo) * 100 : 0;
  document.getElementById('margemProduto').value = margem.toFixed(2);
}
