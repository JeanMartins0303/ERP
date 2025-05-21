const produtos = [
  { nome: "Produto A", categoria: "Eletrônicos", codigo:"XI001020", estoque: 120, preco: 199.90 },
  { nome: "Produto B", categoria: "Vestuário", codigo:"XI001020", estoque: 80, preco: 89.90 },
  { nome: "Produto C", categoria: "Alimentos",codigo:"XI001020", estoque: 150, preco: 12.50 },
  { nome: "Produto D", categoria: "Limpeza",codigo:"XI001020", estoque: 60, preco: 8.99 },
];

const corpoTabela = document.getElementById("corpoTabelaProdutos");

function renderizarTabela() {
  corpoTabela.innerHTML = "";

  produtos.forEach((p, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${p.nome}</td>
      <td>${p.categoria}</td>
      <td>${p.codigo}</td>
      <td>${p.estoque}</td>
      <td>R$ ${p.preco.toFixed(2)}</td>
      <td>
        <div class="acoes-btns">
          <i class="fas fa-edit" title="Editar"></i>
          <i class="fas fa-trash" title="Excluir" onclick="removerProduto(${index})"></i>
        </div>
      </td>
    `;

    corpoTabela.appendChild(tr);
  });
}

function removerProduto(index) {
  if (confirm("Tem certeza que deseja remover este produto?")) {
    produtos.splice(index, 1);
    renderizarTabela();
  }
}

document.getElementById("btnAdicionar").addEventListener("click", () => {
  alert("Função de adicionar produto ainda será implementada.");
});

renderizarTabela();
