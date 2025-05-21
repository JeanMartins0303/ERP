document.getElementById('formRecuperarSenha').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    alert('E-mail não encontrado. Verifique e tente novamente.');
    return;
  }

  // Aqui você pode implementar envio real por backend ou email
  alert(`Instruções de recuperação de senha foram enviadas para o e-mail: ${email}`);
  window.location.href = 'login.html';
});
