// Usuários - FlexBiz ERP

let usuarios = [];
let idEdicao = null;

document.addEventListener('DOMContentLoaded', () => {
  configurarTema();
  carregarUsuarios();
  configurarEventos();
});

function configurarTema() {
  const temaSalvo = localStorage.getItem('tema') || 'light';
  document.body.className = temaSalvo;
  atualizarIconeTema(temaSalvo);
  document.getElementById('btnToggleTema').onclick = () => {
    const temaAtual = document.body.classList.contains('light') ? 'dark' : 'light';
    document.body.className = temaAtual;
    localStorage.setItem('tema', temaAtual);
    atualizarIconeTema(temaAtual);
  };
}
function atualizarIconeTema(tema) {
  const btn = document.getElementById('btnToggleTema');
  btn.innerHTML = tema === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

function configurarEventos() {
  document.getElementById('searchUsuario').addEventListener('input', filtrarUsuarios);
  document.getElementById('filtroTipoUsuario').addEventListener('change', filtrarUsuarios);
  document.getElementById('formNovoUsuario').addEventListener('submit', salvarNovoUsuario);
}

function carregarUsuarios() {
  usuarios = [
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@empresa.com',
      perfil: 'admin',
      status: 'ativo',
      telefone: '(11) 99999-1111',
      cpf: '123.456.789-00',
      foto: ''
    },
    {
      id: 2,
      nome: 'Maria Souza',
      email: 'maria@empresa.com',
      perfil: 'gerente',
      status: 'ativo',
      telefone: '(21) 98888-2222',
      cpf: '987.654.321-00',
      foto: ''
    },
    {
      id: 3,
      nome: 'Carlos Lima',
      email: 'carlos@empresa.com',
      perfil: 'operador',
      status: 'inativo',
      telefone: '(31) 97777-3333',
      cpf: '111.222.333-44',
      foto: ''
    }
  ];
  atualizarTabelaUsuarios();
}

function atualizarTabelaUsuarios(filtradas = null) {
  const tbody = document.getElementById('usuariosTableBody');
  tbody.innerHTML = '';
  const lista = filtradas || usuarios;
  lista.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img class="foto-perfil" src="${u.foto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.nome)}" alt="Foto de Perfil"></td>
      <td>${u.nome}</td>
      <td>${u.email}</td>
      <td>${u.telefone || ''}</td>
      <td>${u.cpf || ''}</td>
      <td>${rotuloPerfil(u.perfil)}</td>
      <td><span class="status-badge ${u.status}">${rotuloStatus(u.status)}</span></td>
      <td class="acoes">
        <button class="btn-icon" onclick="editarUsuario(${u.id})" title="Editar"><i class="fas fa-edit"></i></button>
        <button class="btn-icon" onclick="excluirUsuario(${u.id})" title="Excluir"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filtrarUsuarios() {
  const tipo = document.getElementById('filtroTipoUsuario').value;
  const busca = document.getElementById('searchUsuario').value.toLowerCase();
  let filtradas = usuarios;
  if (tipo !== 'todos') {
    filtradas = filtradas.filter(u => u.perfil === tipo);
  }
  if (busca) {
    filtradas = filtradas.filter(u => u.nome.toLowerCase().includes(busca) || u.email.toLowerCase().includes(busca));
  }
  atualizarTabelaUsuarios(filtradas);
}

function abrirModalNovoUsuario() {
  idEdicao = null;
  document.getElementById('formNovoUsuario').reset();
  document.getElementById('modalNovoUsuario').classList.add('active');
}
window.abrirModalNovoUsuario = abrirModalNovoUsuario;

function fecharModalNovoUsuario() {
  document.getElementById('modalNovoUsuario').classList.remove('active');
  idEdicao = null;
}
window.fecharModalNovoUsuario = fecharModalNovoUsuario;

function salvarNovoUsuario(e) {
  e.preventDefault();
  const fileInput = document.getElementById('fotoUsuario');
  const novoUsuario = () => ({
    id: idEdicao || (usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1),
    nome: document.getElementById('nomeUsuario').value,
    email: document.getElementById('emailUsuario').value,
    perfil: document.getElementById('perfilUsuario').value,
    status: document.getElementById('statusUsuario').value,
    telefone: document.getElementById('telefoneUsuario').value,
    cpf: document.getElementById('cpfUsuario').value,
    foto: ''
  });
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      const usuario = novoUsuario();
      usuario.foto = evt.target.result;
      salvarUsuarioFinal(usuario);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    salvarUsuarioFinal(novoUsuario());
  }
}
function salvarUsuarioFinal(usuario) {
  if (idEdicao) {
    const idx = usuarios.findIndex(u => u.id === idEdicao);
    usuarios[idx] = usuario;
  } else {
    usuarios.push(usuario);
  }
  atualizarTabelaUsuarios();
  fecharModalNovoUsuario();
}
window.editarUsuario = function(id) {
  const u = usuarios.find(u => u.id === id);
  if (!u) {
    return;
  }
  idEdicao = id;
  document.getElementById('nomeUsuario').value = u.nome;
  document.getElementById('emailUsuario').value = u.email;
  document.getElementById('perfilUsuario').value = u.perfil;
  document.getElementById('statusUsuario').value = u.status;
  document.getElementById('telefoneUsuario').value = u.telefone || '';
  document.getElementById('cpfUsuario').value = u.cpf || '';
  document.getElementById('fotoUsuario').value = '';
  document.getElementById('modalNovoUsuario').classList.add('active');
};

window.excluirUsuario = function(id) {
  if (confirm('Deseja realmente excluir este usuário?')) {
    usuarios = usuarios.filter(u => u.id !== id);
    atualizarTabelaUsuarios();
  }
};

function rotuloPerfil(perfil) {
  const map = { admin: 'Administrador', gerente: 'Gerente', operador: 'Operador' };
  return map[perfil] || perfil;
}
function rotuloStatus(status) {
  const map = { ativo: 'Ativo', inativo: 'Inativo' };
  return map[status] || status;
}

window.exportarUsuarios = function() {
  const dados = JSON.stringify(usuarios, null, 2);
  const blob = new Blob([dados], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'usuarios.json';
  a.click();
  URL.revokeObjectURL(url);
};
window.imprimirUsuarios = function() {
  window.print();
};
