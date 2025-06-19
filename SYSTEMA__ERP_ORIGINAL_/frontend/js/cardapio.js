// Dados de exemplo
const pratos = [
  {
    id: 1,
    nome: 'X-Burger',
    categoria: 'Lanches',
    descricao: 'Hambúrguer artesanal com queijo, alface e tomate',
    preco: 15.9,
    tempoPreparo: 15,
    status: 'ativo',
    imagem:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
    nome: 'Batata Frita',
    categoria: 'Acompanhamentos',
    descricao: 'Porção de batata frita crocante',
    preco: 8.9,
    tempoPreparo: 10,
    status: 'ativo',
    imagem:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ingredientes: [
      { id: 6, nome: 'Batata', quantidade: 200, unidade: 'g' },
      { id: 7, nome: 'Óleo', quantidade: 50, unidade: 'ml' }
    ]
  },
  {
    id: 3,
    nome: 'Coca-Cola 350ml',
    categoria: 'Bebidas',
    descricao: 'Refrigerante Coca-Cola lata 350ml',
    preco: 5.9,
    tempoPreparo: 1,
    status: 'ativo',
    imagem: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ingredientes: [{ id: 8, nome: 'Coca-Cola', quantidade: 1, unidade: 'lata' }]
  }
];

// Estado da aplicação
const estado = {
  pratos: [...pratos],
  filtros: {
    categoria: 'todas',
    busca: ''
  },
  pratoEditando: null
};

// Funções auxiliares
const formatarMoeda = valor => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

const formatarTempo = minutos => {
  return `${minutos} min`;
};

// Renderizar cardápio
const renderizarCardapio = () => {
  const pratosFiltrados = estado.pratos.filter(prato => {
    const matchCategoria = estado.filtros.categoria === 'todas' || prato.categoria === estado.filtros.categoria;
    const matchBusca =
      !estado.filtros.busca ||
      prato.nome.toLowerCase().includes(estado.filtros.busca.toLowerCase()) ||
      prato.descricao.toLowerCase().includes(estado.filtros.busca.toLowerCase());

    return matchCategoria && matchBusca;
  });

  const cardapioGrid = document.querySelector('.cardapio-grid');
  cardapioGrid.innerHTML = pratosFiltrados
    .map(
      prato => `
    <article class="prato-card">
      <img src="${prato.imagem}" alt="${prato.nome}" class="prato-imagem">
      <div class="prato-info">
        <div class="prato-header">
          <h3 class="prato-nome">${prato.nome}</h3>
          <span class="prato-preco">${formatarMoeda(prato.preco)}</span>
        </div>
        <p class="prato-descricao">${prato.descricao}</p>
        <div class="prato-detalhes">
          <span><i class="fas fa-clock"></i> ${formatarTempo(prato.tempoPreparo)}</span>
          <span><i class="fas fa-tag"></i> ${prato.categoria}</span>
        </div>
        <div class="prato-acoes">
          <button onclick="editarPrato(${prato.id})" class="btn-editar">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button onclick="excluirPrato(${prato.id})" class="btn-excluir">
            <i class="fas fa-trash"></i> Excluir
          </button>
        </div>
      </div>
    </article>
  `
    )
    .join('');
};

// Event Listeners
document.getElementById('btnAdicionar').addEventListener('click', () => {
  estado.pratoEditando = {
    id: Date.now(),
    nome: '',
    categoria: '',
    descricao: '',
    preco: 0,
    tempoPreparo: 0,
    status: 'ativo',
    imagem:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ingredientes: []
  };
  abrirModal();
});

document.getElementById('btnFiltrar').addEventListener('click', () => {
  estado.filtros = {
    categoria: document.getElementById('categoriaCardapio').value,
    busca: document.getElementById('buscaCardapio').value
  };
  renderizarCardapio();
});

// Funções de manipulação
const abrirModal = () => {
  const modal = document.getElementById('modalPrato');
  modal.style.display = 'flex';
  modal.style.opacity = '1';
  modal.style.visibility = 'visible';

  // Preencher formulário
  if (estado.pratoEditando) {
    document.getElementById('categoriaPrato').value = estado.pratoEditando.categoria;
    document.getElementById('nomePrato').value = estado.pratoEditando.nome;
    document.getElementById('descricaoPrato').value = estado.pratoEditando.descricao;
    document.getElementById('precoPrato').value = estado.pratoEditando.preco;
    document.getElementById('tempoPreparo').value = estado.pratoEditando.tempoPreparo;
    document.getElementById('statusPrato').value = estado.pratoEditando.status;
  }

  renderizarIngredientes();
};

const fecharModal = () => {
  const modal = document.getElementById('modalPrato');
  modal.style.display = 'none';
  modal.style.opacity = '0';
  modal.style.visibility = 'hidden';
  estado.pratoEditando = null;
  document.getElementById('formPrato').reset();
};

const salvarPrato = () => {
  const formData = new FormData(document.getElementById('formPrato'));
  const dados = Object.fromEntries(formData.entries());

  const prato = {
    ...estado.pratoEditando,
    ...dados,
    preco: Number(dados.preco),
    tempoPreparo: Number(dados.tempoPreparo)
  };

  const index = estado.pratos.findIndex(p => p.id === prato.id);
  if (index >= 0) {
    estado.pratos[index] = prato;
    mostrarNotificacao('Prato atualizado com sucesso!', 'success');
  } else {
    estado.pratos.push(prato);
    mostrarNotificacao('Prato adicionado com sucesso!', 'success');
  }

  fecharModal();
  renderizarCardapio();
};

const editarPrato = id => {
  estado.pratoEditando = { ...estado.pratos.find(p => p.id === id) };
  abrirModal();
};

const excluirPrato = id => {
  if (confirm('Tem certeza que deseja excluir este prato?')) {
    estado.pratos = estado.pratos.filter(p => p.id !== id);
    renderizarCardapio();
    mostrarNotificacao('Prato excluído com sucesso!', 'success');
  }
};

const renderizarIngredientes = () => {
  if (!estado.pratoEditando) {
    return;
  }

  const listaIngredientes = document.getElementById('listaIngredientes');
  listaIngredientes.innerHTML = estado.pratoEditando.ingredientes
    .map(
      (ing, index) => `
    <div class="ingrediente-item">
      <select class="ingrediente-select" onchange="atualizarIngrediente(${index}, this.value)">
        ${pratos
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
  `
    )
    .join('');
};

const atualizarIngrediente = (index, id) => {
  estado.pratoEditando.ingredientes[index].id = Number(id);
  renderizarIngredientes();
};

const atualizarQuantidade = (index, quantidade) => {
  estado.pratoEditando.ingredientes[index].quantidade = Number(quantidade);
};

const removerIngrediente = index => {
  estado.pratoEditando.ingredientes.splice(index, 1);
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

// Event Listeners do Modal
document.getElementById('btnFecharModal').addEventListener('click', fecharModal);
document.getElementById('btnCancelar').addEventListener('click', fecharModal);
document.getElementById('formPrato').addEventListener('submit', e => {
  e.preventDefault();
  salvarPrato();
});

document.getElementById('btnAdicionarIngrediente').addEventListener('click', () => {
  if (!estado.pratoEditando.ingredientes) {
    estado.pratoEditando.ingredientes = [];
  }
  estado.pratoEditando.ingredientes.push({
    id: pratos.find(p => p.tipo === 'ingrediente')?.id || 1,
    quantidade: 1,
    unidade: 'un'
  });
  renderizarIngredientes();
});

// Inicialização
const inicializar = () => {
  // Preencher categorias
  const categorias = [...new Set(pratos.map(p => p.categoria))];
  document.getElementById('categoriaCardapio').innerHTML = `
    <option value="todas">Todas</option>
    ${categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
  `;

  // Preencher categorias no formulário
  document.getElementById('categoriaPrato').innerHTML = document.getElementById('categoriaCardapio').innerHTML;

  // Renderizar dados iniciais
  renderizarCardapio();
};

// Iniciar aplicação
inicializar();
