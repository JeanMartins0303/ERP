document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formAjuda');
  const mensagem = document.getElementById('mensagem');
  const nomeInput = form.nome;
  const emailInput = form.email;

  // Opcional: carregar nome e email do localStorage, se existir
  if(localStorage.getItem('usuarioNome')) {
    nomeInput.value = localStorage.getItem('usuarioNome');
  }
  if(localStorage.getItem('usuarioEmail')) {
    emailInput.value = localStorage.getItem('usuarioEmail');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(!form.checkValidity()) {
      mensagem.className = 'mensagem erro';
      mensagem.textContent = 'Por favor, preencha todos os campos obrigatórios corretamente.';
      mensagem.style.display = 'block';
      return;
    }

    // Simula envio...
    mensagem.className = 'mensagem sucesso';
    mensagem.textContent = 'Sua solicitação foi enviada com sucesso! Em breve, nossa equipe entrará em contato.';
    mensagem.style.display = 'block';

    // Opcional: salvar nome e email no localStorage para reutilizar
    localStorage.setItem('usuarioNome', nomeInput.value.trim());
    localStorage.setItem('usuarioEmail', emailInput.value.trim());

    form.reset();
  });

  form.addEventListener('reset', () => {
    mensagem.style.display = 'none';
  });
});
