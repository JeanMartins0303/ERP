// usuarios.js

// Simula um banco local com localStorage
const LS_CHAVE = 'erp_usuarios';

// Pega os usuários do localStorage
function getUsuarios() {
  const usuarios = localStorage.getItem(LS_CHAVE);
  return usuarios ? JSON.parse(usuarios) : [];
}

// Salva a lista no localStorage
function setUsuarios(lista) {
  localStorage.setItem(LS_CHAVE, JSON.stringify(lista));
}

// Gera ID incremental simples
function gerarId() {
  const lista = getUsuarios();
  return lista.length ? Math.max(...lista.map(u => u.id)) + 1 : 1;
}

// Renderiza tabela de usuários
function renderizarTabela() {
  const tabela = document.getElementById('tabelaUsuarios');
  const usuarios = getUsuarios();

  tabela.innerHTML = '';

  if (usuarios.length === 0) {
    tabela.innerHTML = `<tr><td colspan="3" style="text-align:center; color: #999;">Nenhum usuário cadastrado.</td></tr>`;
    return;
  }

  usuarios.forEach(user => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${user.nome}</td>
      <td>${user.email}</td>
      <td>
        <button class="btn-editar" data-id="${user.id}" aria-label="Editar usuário ${user.nome}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-excluir" data-id="${user.id}" aria-label="Excluir usuário ${user.nome}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;

    tabela.appendChild(tr);
  });

  // Adiciona eventos aos botões
  document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      excluirUsuario(id);
    });
  });

  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      abrirEdicao(id);
    });
  });
}

// Adiciona novo usuário
function adicionarUsuario(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (!nome || !email || !senha) {
    alert('Preencha todos os campos.');
    return;
  }

  // Validação básica de email
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Informe um e-mail válido.');
    return;
  }

  const usuarios = getUsuarios();

  // Checa email duplicado
  if (usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    alert('Este e-mail já está cadastrado.');
    return;
  }

  const novoUsuario = {
    id: gerarId(),
    nome,
    email,
    senha // em app real, senha deve ser hash
  };

  usuarios.push(novoUsuario);
  setUsuarios(usuarios);
  renderizarTabela();

  // Limpa formulário
  event.target.reset();
}

// Excluir usuário com confirmação
function excluirUsuario(id) {
  if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

  let usuarios = getUsuarios();
  usuarios = usuarios.filter(u => u.id !== id);
  setUsuarios(usuarios);
  renderizarTabela();
}

// Abrir edição (modal simples)
function abrirEdicao(id) {
  const usuarios = getUsuarios();
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return alert('Usuário não encontrado.');

  // Cria modal
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitulo">
      <h2 id="modalTitulo">Editar usuário</h2>
      <form id="formEditarUsuario">
        <label for="editarNome">Nome completo</label>
        <input type="text" id="editarNome" name="editarNome" value="${usuario.nome}" required />
        
        <label for="editarEmail">E-mail</label>
        <input type="email" id="editarEmail" name="editarEmail" value="${usuario.email}" required />
        
        <label for="editarSenha">Senha</label>
        <input type="password" id="editarSenha" name="editarSenha" placeholder="Nova senha (opcional)" />
        
        <div class="modal-actions">
          <button type="submit" class="btn-salvar">Salvar</button>
          <button type="button" class="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden'; // trava scroll

  // Evento fechar modal
  modal.querySelector('.btn-cancelar').addEventListener('click', () => fecharModal(modal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal(modal);
  });

  // Evento submit edição
  modal.querySelector('#formEditarUsuario').addEventListener('submit', e => {
    e.preventDefault();

    const nome = e.target.editarNome.value.trim();
    const email = e.target.editarEmail.value.trim();
    const senha = e.target.editarSenha.value.trim();

    if (!nome || !email) {
      alert('Nome e e-mail são obrigatórios.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Informe um e-mail válido.');
      return;
    }

    // Verifica se email está duplicado em outro usuário
    if (usuarios.some(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== id)) {
      alert('Este e-mail já está cadastrado em outro usuário.');
      return;
    }

    // Atualiza dados
    usuario.nome = nome;
    usuario.email = email;
    if (senha) usuario.senha = senha;

    setUsuarios(usuarios);
    renderizarTabela();
    fecharModal(modal);
  });
}

// Fecha modal e libera scroll
function fecharModal(modal) {
  modal.remove();
  document.body.style.overflow = '';
}

// Inicialização
function init() {
  renderizarTabela();

  const form = document.getElementById('formUsuario');
  form.addEventListener('submit', adicionarUsuario);
}

window.addEventListener('DOMContentLoaded', init);


   // Seleciona o botão e a sidebar
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const icon = menuToggle.querySelector('i');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    sidebar.classList.toggle('open');

    if (menuToggle.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark', 'close-icon'); // adiciona cor diferente
      menuToggle.setAttribute('aria-label', 'Fechar menu');
    } else {
      icon.classList.remove('fa-xmark', 'close-icon');
      icon.classList.add('fa-bars');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    }
  });
});
