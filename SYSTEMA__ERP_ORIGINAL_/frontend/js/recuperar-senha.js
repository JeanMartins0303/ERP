(() => {
      const body = document.body;
      const toggleBtn = document.querySelector('.toggle-theme');
      const icon = toggleBtn.querySelector('i');

      // Inicializa tema salvo no localStorage ou padrão claro
      const temaSalvo = localStorage.getItem('tema') || 'claro';
      if (temaSalvo === 'escuro') {
        body.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
      }

      toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        const temaAtual = body.classList.contains('dark') ? 'escuro' : 'claro';
        localStorage.setItem('tema', temaAtual);

        // Alterna ícone
        if (temaAtual === 'escuro') {
          icon.classList.replace('fa-moon', 'fa-sun');
        } else {
          icon.classList.replace('fa-sun', 'fa-moon');
        }
      });

      // Validação simples do formulário
      const form = document.getElementById('formRecuperarSenha');
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = form.email;
        if (!emailInput.value || !emailInput.checkValidity()) {
          alert('Por favor, insira um e-mail válido.');
          emailInput.focus();
          return;
        }

        // Aqui você pode disparar a lógica para envio do link, ex: fetch para API
        alert('Se o e-mail existir em nosso sistema, um link de recuperação foi enviado.');
        form.reset();
      });
    })();