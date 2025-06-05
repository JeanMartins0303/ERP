document.addEventListener('DOMContentLoaded', () => {
  const recuperarForm = document.getElementById('recuperarForm');
  const mensagemElement = document.getElementById('mensagemRecuperacao');

  // Função para mostrar mensagens
  function mostrarMensagem(texto, tipo) {
    mensagemElement.textContent = texto;
    mensagemElement.className = `mensagem ${tipo} visivel`;
    
    setTimeout(() => {
      mensagemElement.className = 'mensagem';
    }, 5000);
  }

  // Função para validar email
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Manipulador do formulário
  recuperarForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();

    // Validação do email
    if (!validarEmail(email)) {
      mostrarMensagem('Por favor, insira um email válido.', 'erro');
      return;
    }

    try {
      // Aqui você deve implementar a chamada para sua API
      // const response = await fetch('/api/recuperar-senha', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email }),
      // });

      // Simulação de resposta da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Limpar o formulário
      recuperarForm.reset();

      // Mostrar mensagem de sucesso
      mostrarMensagem('Link de recuperação enviado com sucesso! Verifique seu email.', 'sucesso');

    } catch (erro) {
      console.error('Erro ao processar a recuperação de senha:', erro);
      mostrarMensagem('Ocorreu um erro ao processar sua solicitação. Tente novamente.', 'erro');
    }
  });

  // Adicionar efeito de foco nos inputs
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focado');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focado');
    });
  });
}); 