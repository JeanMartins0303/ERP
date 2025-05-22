const produtos = [
  { nome: "Produto A", categoria: "Eletrônicos", codigo:"XI001001", estoque: 120, preco: 199.90 },
  { nome: "Produto B", categoria: "Vestuário", codigo:"XI001002", estoque: 80, preco: 89.90 },
  { nome: "Produto C", categoria: "Alimentos", codigo:"XI001003", estoque: 150, preco: 12.50 },
  { nome: "Produto D", categoria: "Limpeza", codigo:"XI001004", estoque: 60, preco: 8.99 },
];

const corpoTabela = document.getElementById("corpoTabelaProdutos");

function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function renderizarTabela() {
  corpoTabela.innerHTML = "";

  produtos.forEach((produto, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td>${produto.categoria}</td>
      <td>${produto.codigo}</td>
      <td>${produto.estoque}</td>
      <td>${formatarPreco(produto.preco)}</td>
      <td>
        <div class="acoes-btns">
          <button class="btn-editar" title="Editar" aria-label="Editar produto ${produto.nome}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-excluir" title="Excluir" aria-label="Excluir produto ${produto.nome}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;

    // Adiciona eventos aos botões
    const btnEditar = tr.querySelector(".btn-editar");
    btnEditar.addEventListener("click", () => editarProduto(index));

    const btnExcluir = tr.querySelector(".btn-excluir");
    btnExcluir.addEventListener("click", () => removerProduto(index));

    corpoTabela.appendChild(tr);
  });
}

const toggleButton = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".sidebar");

  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-ativo");
  });







  

function removerProduto(index) {
  if (confirm("Tem certeza que deseja remover este produto?")) {
    produtos.splice(index, 1);
    renderizarTabela();
  }
}

function editarProduto(index) {
  alert(`Função de editar produto ainda será implementada para: ${produtos[index].nome}`);
}

document.getElementById("btnAdicionar").addEventListener("click", () => {
  alert("Função de adicionar produto ainda será implementada.");
});

renderizarTabela();


