const formUsuario = document.getElementById("formUsuario");
const tabelaUsuarios = document.getElementById("tabelaUsuarios");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let indexEditando = null;

function renderizarUsuarios() {
  tabelaUsuarios.innerHTML = "";
  usuarios.forEach((usuario, index) => {
    const tr = document.createElement("tr");

    const tdFoto = document.createElement("td");
    const img = document.createElement("img");
    img.src = usuario.foto || "https://via.placeholder.com/50";
    img.alt = "Foto do usuário";
    img.classList.add("foto-perfil");
    tdFoto.appendChild(img);

    const tdNome = document.createElement("td");
    tdNome.textContent = usuario.nome;

    const tdEmail = document.createElement("td");
    tdEmail.textContent = usuario.email;

    const tdTelefone = document.createElement("td");
    tdTelefone.textContent = usuario.telefone;

    const tdCargo = document.createElement("td");
    tdCargo.textContent = usuario.cargo;

    const tdAcoes = document.createElement("td");
    tdAcoes.classList.add("acoes");

    const btnEditar = document.createElement("button");
    btnEditar.innerHTML = '<i class="fas fa-edit"></i>';
    btnEditar.title = "Editar";
    btnEditar.onclick = () => editarUsuario(index);

    const btnExcluir = document.createElement("button");
    btnExcluir.innerHTML = '<i class="fas fa-trash-alt"></i>';
    btnExcluir.title = "Excluir";
    btnExcluir.onclick = () => excluirUsuario(index);

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdFoto);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdTelefone);
    tr.appendChild(tdCargo);
    tr.appendChild(tdAcoes);

    tabelaUsuarios.appendChild(tr);
  });
}

function salvarNoStorage() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function resetarFormulario() {
  formUsuario.reset();
  indexEditando = null;
}

function editarUsuario(index) {
  const usuario = usuarios[index];
  document.getElementById("nome").value = usuario.nome;
  document.getElementById("email").value = usuario.email;
  document.getElementById("senha").value = usuario.senha;
  document.getElementById("telefone").value = usuario.telefone;
  document.getElementById("cargo").value = usuario.cargo;
  document.getElementById("perfil").value = usuario.perfil;
  indexEditando = index;
}

function excluirUsuario(index) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    usuarios.splice(index, 1);
    salvarNoStorage();
    renderizarUsuarios();
  }
}

function lerImagem(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

formUsuario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const telefone = document.getElementById("telefone").value.trim();
  const cargo = document.getElementById("cargo").value.trim();
  const perfil = document.getElementById("perfil").value;
  const fotoArquivo = document.getElementById("fotoPerfil").files[0];

  let fotoBase64 = "";
  if (fotoArquivo) {
    fotoBase64 = await lerImagem(fotoArquivo);
  }

  const novoUsuario = { nome, email, senha, telefone, cargo, perfil, foto: fotoBase64 };

  if (indexEditando !== null) {
    usuarios[indexEditando] = novoUsuario;
  } else {
    usuarios.push(novoUsuario);
  }

  salvarNoStorage();
  renderizarUsuarios();
  resetarFormulario();
});

document.querySelector(".btn-reset").addEventListener("click", resetarFormulario);

// Inicializa
renderizarUsuarios();
