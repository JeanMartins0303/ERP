document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const btnAdicionar = document.getElementById('btnAdicionar');
  const modalProduto = document.getElementById('modalProduto');
  const btnFecharModal = document.getElementById('btnFecharModal');
  const formProduto = document.getElementById('formProduto');
  const corpoTabelaProdutos = document.getElementById('corpoTabelaProdutos');
  const modalTitle = document.getElementById('modalTitle');

  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  let editandoProdutoIndex = null;

  // Função para atualizar a tabela na tela
  function atualizarTabela() {
    corpoTabelaProdutos.innerHTML = '';

    if (produtos.length === 0) {
      const trVazio = document.createElement('tr');
      trVazio.innerHTML = `<td colspan="6" style="text-align:center; color:#999;">Nenhum produto cadastrado.</td>`;
      corpoTabelaProdutos.appendChild(trVazio);
      return;
    }

    produtos.forEach((produto, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.categoria}</td>
        <td>${produto.codigo}</td>
        <td>${produto.estoque}</td>
        <td>R$ ${produto.preco.toFixed(2).replace('.', ',')}</td>
        <td class="acoes-btns">
          <i class="fas fa-edit" role="button" tabindex="0" aria-label="Editar produto ${produto.nome}" data-index="${index}"></i>
          <i class="fas fa-trash" role="button" tabindex="0" aria-label="Excluir produto ${produto.nome}" data-index="${index}"></i>
        </td>
      `;
      corpoTabelaProdutos.appendChild(tr);
    });
  }

  // Abrir modal para adicionar produto
  btnAdicionar.addEventListener('click', () => {
    editandoProdutoIndex = null;
    modalTitle.textContent = 'Adicionar Produto';
    formProduto.reset();
    modalProduto.classList.remove('hidden');
    formProduto.nomeProduto.focus();
  });

  // Fechar modal
  btnFecharModal.addEventListener('click', () => {
    modalProduto.classList.add('hidden');
  });

  // Fechar modal ao clicar fora do conteúdo
  modalProduto.addEventListener('click', (e) => {
    if (e.target === modalProduto) {
      modalProduto.classList.add('hidden');
    }
  });

  // Adicionar/editar produto no localStorage e atualizar tabela
  formProduto.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = formProduto.nomeProduto.value.trim();
    const categoria = formProduto.categoriaProduto.value.trim();
    const codigo = formProduto.codigoProduto.value.trim();
    const estoque = parseInt(formProduto.estoqueProduto.value);
    const preco = parseFloat(formProduto.precoProduto.value);

    if (!nome || !categoria || !codigo || isNaN(estoque) || isNaN(preco)) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const produto = { nome, categoria, codigo, estoque, preco };

    if (editandoProdutoIndex !== null) {
      produtos[editandoProdutoIndex] = produto;
      alert('Produto atualizado com sucesso!');
    } else {
      produtos.push(produto);
      alert('Produto adicionado com sucesso!');
    }

    localStorage.setItem('produtos', JSON.stringify(produtos));
    atualizarTabela();
    modalProduto.classList.add('hidden');
  });

  // Delegação de eventos para edição e exclusão na tabela
  corpoTabelaProdutos.addEventListener('click', (e) => {
    if (e.target.matches('.fa-edit')) {
      editandoProdutoIndex = Number(e.target.dataset.index);
      const produto = produtos[editandoProdutoIndex];

      modalTitle.textContent = 'Editar Produto';
      formProduto.nomeProduto.value = produto.nome;
      formProduto.categoriaProduto.value = produto.categoria;
      formProduto.codigoProduto.value = produto.codigo;
      formProduto.estoqueProduto.value = produto.estoque;
      formProduto.precoProduto.value = produto.preco;

      modalProduto.classList.remove('hidden');
      formProduto.nomeProduto.focus();
    }

    if (e.target.matches('.fa-trash')) {
      const index = Number(e.target.dataset.index);
      const confirmado = confirm(`Tem certeza que deseja excluir o produto "${produtos[index].nome}"?`);
      if (confirmado) {
        produtos.splice(index, 1);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        atualizarTabela();
      }
    }
  });

  // Ativar sidebar no mobile ao clicar no botão
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', sidebar.classList.contains('active'));
  });

  // Inicializa tabela na carga da página
  atualizarTabela();
});
