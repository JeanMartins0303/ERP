// Simulação inicial de dados (substituir pela integração backend posteriormente)
document.getElementById('produtos-count').innerText = 120;
document.getElementById('receita-total').innerText = 'R$ 15.450,00';
document.getElementById('despesas-total').innerText = 'R$ 3.250,00';

// Configuração do gráfico usando Chart.js
const ctx = document.getElementById('graficoFinanceiro').getContext('2d');
const grafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    datasets: [
      {
        label: 'Receita',
        data: [3200, 4100, 3900, 4800, 4450],
        backgroundColor: 'rgba(46, 204, 113, 0.7)', // Verde suave
        borderRadius: 6
      },
      {
        label: 'Despesas',
        data: [1000, 1200, 950, 1300, 1100],
        backgroundColor: 'rgba(231, 76, 60, 0.7)', // Vermelho suave
        borderRadius: 6
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Desempenho Financeiro Mensal',
        font: {
          size: 18,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 14
          }
        }
      }
    }
  }
});












// Produtos simulados (mock)
let produtos = [
  { id: 1, nome: "Camiseta", categoria: "Vestuário", preco: 49.9, quantidade: 120 },
  { id: 2, nome: "Caneca", categoria: "Utensílios", preco: 25.0, quantidade: 60 },
  { id: 3, nome: "Caderno", categoria: "Papelaria", preco: 15.5, quantidade: 150 },
];

const tbody = document.getElementById("produtos-tbody");
const buscaInput = document.getElementById("busca-produtos");
const modal = document.getElementById("modal-produto");
const btnAdd = document.getElementById("btn-add-produto");
const closeModalBtn = document.getElementById("close-modal");
const formProduto = document.getElementById("form-produto");
const modalTitle = document.getElementById("modal-title");

let editandoId = null;

// Renderizar produtos na tabela
function renderProdutos(filtro = "") {
  tbody.innerHTML = "";
  const filtroMinusculo = filtro.toLowerCase();

  produtos
    .filter((p) => p.nome.toLowerCase().includes(filtroMinusculo))
    .forEach((produto) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.categoria}</td>
        <td>${produto.preco.toFixed(2)}</td>
        <td>${produto.quantidade}</td>
        <td>
          <button class="btn-acao" aria-label="Editar ${produto.nome}" data-id="${produto.id}" data-action="editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-acao" aria-label="Excluir ${produto.nome}" data-id="${produto.id}" data-action="excluir">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

// Abrir modal para adicionar produto
btnAdd.addEventListener("click", () => {
  editandoId = null;
  modalTitle.textContent = "Adicionar Produto";
  formProduto.reset();
  modal.classList.add("active");
  formProduto.nome.focus();
});

// Fechar modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Fechar modal ao clicar fora
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// Buscar produtos na tabela
buscaInput.addEventListener("input", (e) => {
  renderProdutos(e.target.value);
});

// Enviar formulário de produto (adicionar ou editar)
formProduto.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = formProduto.nome.value.trim();
  const categoria = formProduto.categoria.value.trim();
  const preco = parseFloat(formProduto.preco.value);
  const quantidade = parseInt(formProduto.quantidade.value, 10);

  if (!nome || !categoria || isNaN(preco) || isNaN(quantidade)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  if (editandoId) {
    // Editar produto existente
    const index = produtos.findIndex((p) => p.id === editandoId);
    if (index !== -1) {
      produtos[index] = { id: editandoId, nome, categoria, preco, quantidade };
    }
  } else {
    // Adicionar novo produto
    const novoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
    produtos.push({ id: novoId, nome, categoria, preco, quantidade });
  }

  renderProdutos(buscaInput.value);
  modal.classList.remove("active");
});

// Delegação para botões de ação na tabela (editar e excluir)
tbody.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = parseInt(btn.dataset.id, 10);
  const action = btn.dataset.action;

  if (action === "editar") {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;

    editandoId = id;
    modalTitle.textContent = "Editar Produto";
    formProduto.nome.value = produto.nome;
    formProduto.categoria.value = produto.categoria;
    formProduto.preco.value = produto.preco;
    formProduto.quantidade.value = produto.quantidade;

    modal.classList.add("active");
    formProduto.nome.focus();
  }

  if (action === "excluir") {
    const confirma = confirm(`Deseja realmente excluir o produto "${produtos.find((p) => p.id === id).nome}"?`);
    if (confirma) {
      produtos = produtos.filter((p) => p.id !== id);
      renderProdutos(buscaInput.value);
    }
  }
});

// Render inicial
renderProdutos();

