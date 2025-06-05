document.addEventListener('DOMContentLoaded', () => {
  const cadastroForm = document.getElementById('cadastroForm');
  const mensagemElement = document.getElementById('mensagemCadastro');
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');

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

  // Função para validar telefone
  function validarTelefone(telefone) {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(telefone);
  }

  // Função para validar senha
  function validarSenha(senha) {
    return senha.length >= 6;
  }

  // Função para formatar telefone
  function formatarTelefone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 9) {
      value = `${value.slice(0, 9)}-${value.slice(9)}`;
    }
    
    input.value = value;
  }

  // Manipulador do formulário
  cadastroForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const termos = document.getElementById('termos').checked;

    // Validações
    if (nome.length < 3) {
      mostrarMensagem('O nome deve ter pelo menos 3 caracteres.', 'erro');
      return;
    }

    if (empresa.length < 2) {
      mostrarMensagem('O nome da empresa deve ter pelo menos 2 caracteres.', 'erro');
      return;
    }

    if (!validarEmail(email)) {
      mostrarMensagem('Por favor, insira um email válido.', 'erro');
      return;
    }

    if (!validarTelefone(telefone)) {
      mostrarMensagem('Por favor, insira um telefone válido.', 'erro');
      return;
    }

    if (!validarSenha(senha)) {
      mostrarMensagem('A senha deve ter pelo menos 6 caracteres.', 'erro');
      return;
    }

    if (senha !== confirmarSenha) {
      mostrarMensagem('As senhas não coincidem.', 'erro');
      return;
    }

    if (!termos) {
      mostrarMensagem('Você precisa aceitar os termos de uso.', 'erro');
      return;
    }

    try {
      // Aqui você deve implementar a chamada para sua API
      // const response = await fetch('/api/cadastro', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     nome,
      //     empresa,
      //     email,
      //     telefone,
      //     senha,
      //   }),
      // });

      // Simulação de resposta da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Limpar o formulário
      cadastroForm.reset();

      // Mostrar mensagem de sucesso
      mostrarMensagem('Cadastro realizado com sucesso! Redirecionando...', 'sucesso');

      // Redirecionar após o cadastro
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);

    } catch (erro) {
      console.error('Erro ao realizar cadastro:', erro);
      mostrarMensagem('Erro ao realizar cadastro. Tente novamente.', 'erro');
    }
  });

  // Formatar telefone enquanto digita
  const telefoneInput = document.getElementById('telefone');
  telefoneInput.addEventListener('input', () => {
    formatarTelefone(telefoneInput);
  });

  // Toggle de visibilidade da senha
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.parentElement.querySelector('input');
      const icon = button.querySelector('i');

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
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