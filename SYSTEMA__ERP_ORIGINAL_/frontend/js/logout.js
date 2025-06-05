document.addEventListener('DOMContentLoaded', () => {
  const logoutButtons = document.querySelectorAll('.logout-button');
  const mensagemElement = document.getElementById('mensagemLogout');

  // Função para mostrar mensagens
  function mostrarMensagem(texto, tipo) {
    if (mensagemElement) {
      mensagemElement.textContent = texto;
      mensagemElement.className = `mensagem ${tipo} visivel`;
      
      setTimeout(() => {
        mensagemElement.className = 'mensagem';
      }, 3000);
    }
  }

  // Função para confirmar logout
  function confirmarLogout() {
    return new Promise((resolve) => {
      const confirmacao = confirm('Tem certeza que deseja sair do sistema?');
      resolve(confirmacao);
    });
  }

  // Função para realizar o logout
  async function realizarLogout() {
    try {
      // Aqui você deve implementar a chamada para sua API
      // const response = await fetch('/api/logout', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // Simulação de resposta da API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Limpar dados locais
      localStorage.removeItem('token');
      sessionStorage.removeItem('userData');

      // Mostrar mensagem de sucesso
      mostrarMensagem('Logout realizado com sucesso!', 'sucesso');

      // Redirecionar para a página de login
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);

    } catch (erro) {
      console.error('Erro ao realizar logout:', erro);
      mostrarMensagem('Erro ao realizar logout. Tente novamente.', 'erro');
    }
  }

  // Adicionar evento de clique em todos os botões de logout
  logoutButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const confirmado = await confirmarLogout();
      if (confirmado) {
        await realizarLogout();
      }
    });
  });
}); 