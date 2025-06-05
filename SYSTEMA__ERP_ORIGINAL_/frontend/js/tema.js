// Gerenciamento de tema
document.addEventListener('DOMContentLoaded', () => {
  const btnToggleTema = document.getElementById('btnToggleTema');
  if (!btnToggleTema) return;

  // Carregar tema salvo
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'dark') {
    document.body.classList.add('dark');
    atualizarIconeTema();
  }

  // Alternar tema
  btnToggleTema.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('tema', document.body.classList.contains('dark') ? 'dark' : 'light');
    atualizarIconeTema();
  });

  function atualizarIconeTema() {
    const icone = btnToggleTema.querySelector('i');
    if (document.body.classList.contains('dark')) {
      icone.classList.remove('fa-moon');
      icone.classList.add('fa-sun');
    } else {
      icone.classList.remove('fa-sun');
      icone.classList.add('fa-moon');
    }
  }
}); 