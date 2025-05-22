document.addEventListener('DOMContentLoaded', () => {
  const inputUsuario = document.getElementById('usuario');
  inputUsuario.focus();

  // Verifica se já está logado
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  if (usuarioLogado) {
    window.location.href = 'index.html';
  }

  const form = document.getElementById('formLogin');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const usuario = inputUsuario.value.trim();
    const senha = document.getElementById('senha').value;

    if (!usuario || !senha) {
      alert('Por favor, preencha usuário e senha.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (!usuarioEncontrado) {
      alert('Usuário ou senha inválidos.');
      inputUsuario.focus();
      return;
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
    window.location.href = 'index.html';
  });
});
