document.addEventListener('DOMContentLoaded', () => {
  // Se já está logado, redireciona para dashboard
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  if (usuarioLogado) {
    window.location.href = 'index.html';
  }

  const form = document.getElementById('formLogin');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (!usuarioEncontrado) {
      alert('Usuário ou senha inválidos.');
      return;
    }

    // Salvar sessão no localStorage
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

    // Redireciona para dashboard
    window.location.href = 'index.html';
  });
});
