document.getElementById('formCadastro').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const usuario = document.getElementById('usuario').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirmaSenha = document.getElementById('confirmaSenha').value;

  if (senha !== confirmaSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  // Recupera usuários cadastrados do localStorage
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verifica se usuário ou email já existe
  if (usuarios.some(u => u.usuario === usuario)) {
    alert('Nome de usuário já está em uso.');
    return;
  }
  if (usuarios.some(u => u.email === email)) {
    alert('E-mail já cadastrado.');
    return;
  }

  // Adiciona novo usuário
  usuarios.push({ nome, usuario, email, senha });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Cadastro realizado com sucesso! Você já pode fazer login.');
  window.location.href = 'login.html';
});
