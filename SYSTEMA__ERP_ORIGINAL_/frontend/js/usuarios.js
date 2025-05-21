// Lista de usuários simulada (você pode substituir por dados do backend futuramente)
const usuarios = [
  { nome: "João Silva", email: "joao@email.com" },
  { nome: "Maria Souza", email: "maria@email.com" }
];

// Função para renderizar os usuários na tabela
function renderizarUsuarios() {
  const corpoTabela = document.querySelector("#corpo-usuarios");
  corpoTabela.innerHTML = "";

  usuarios.forEach(usuario => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
    `;
    corpoTabela.appendChild(linha);
  });
}

// Função para cadastrar novo usuário
function cadastrarUsuario(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (nome && email) {
    usuarios.push({ nome, email });
    renderizarUsuarios();
    document.getElementById("formUsuario").reset();
  }
}

document.getElementById("formUsuario").addEventListener("submit", cadastrarUsuario);

// Inicializa a tabela ao carregar a página
document.addEventListener("DOMContentLoaded", renderizarUsuarios);
